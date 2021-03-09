#!/bin/env python3
#-----------------------------------------------------------------------------------------------------------------------------------
# Routine Name: s3backup.py
# Author:       Mike Revitt
# Date:         18/03/2020
#------------------------------------------------------------------------------------------------------------------------------------
# Revision History    Push Down List
# -----------------------------------------------------------------------------------------------------------------------------------
# Date        | Name        | Description
# ------------+-------------+--------------------------------------------------------------------------------------------------------
#             |             |
# 18/01/2021  | M Revitt    | Modify to use SQLite backup instead of file copy
# 18/03/2020  | M Revitt    | Initial version
#-------------+-------------+--------------------------------------------------------------------------------------------------------
# Description:  Reads the configuration data from weewx.conf and uses that to copy the website data to S3 using boto3
#
# Issues:       None
#
# ***********************************************************************************************************************************
# Copyright 2021 Mike Revitt <mike@cougar.eu.com>. All Rights Reserved.
#
# Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files
# (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify,
# merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is
# furnished to do so.
#
# THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
# OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
# LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
# CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
# ***********************************************************************************************************************************
"""For backing up the database to S3"""

import logging
import os
import shutil
import sys
import time
import mimetypes
import boto3
import sqlite3

from    weewx.reportengine  import ReportGenerator
from    weeutil.weeutil     import to_bool
from    six.moves           import cPickle
from    datetime            import datetime
from    botocore.exceptions import ClientError
from    botocore.exceptions import ParamValidationError
from    botocore.exceptions import ProfileNotFound

log = logging.getLogger(__name__)

# =============================================================================
#                    Class S3Backup
# =============================================================================
class S3Backup(object):
    
    def __init__(self,
                 bucket,
                 profile,
                 region,
                 weewx_root,
                 sqlite_root,
                 database_name,
                 max_tries      = 3,
                 debug          = 0,
                 secure_data    = True):
                 
        self.bucket             = bucket
        self.profile            = profile
        self.region             = region
        self.weewx_root         = weewx_root
        self.sqlite_root        = sqlite_root
        self.database_name      = database_name
        self.max_tries          = max_tries
        self.debug              = debug
        self.secure_data        = secure_data

    def run(self):
        
        # Add some logging information
        log.debug("S3Backup started at: " + datetime.now().strftime('%d-%m-%Y %H:%M:%S') + "\n")
        
        try:
            session = boto3.Session(profile_name=self.profile, region_name=self.region)
            s3      = session.resource('s3')
        
        except ProfileNotFound as e:
            log.error("Failed to connect to resource S3: using profile '%s'" %(self.profile))
            exit(40)
    
        source_database = os.path.join(self.sqlite_root, self.database_name)
        staged_database = os.path.join(self.weewx_root,  self.database_name)
        dest_database   = source_database.lstrip('/')
        
        # Retry up to max_tries times:
        for count in range(self.max_tries):
            try:
                try:
                    sqliteCon = sqlite3.connect(source_database)
                    backupCon = sqlite3.connect(staged_database)
                    with backupCon:
                        sqliteCon.backup(backupCon)
                except sqlite3.Error as error:
                    log.error("Error while taking backup: ", error)
                finally:
                    backupCon.close()
                    sqliteCon.close()

                response = s3.meta.client.upload_file(staged_database , self.bucket, dest_database,
                                                      ExtraArgs={'ContentType' : 'application/x-sqlite3'})
            except IOError as e:
                log.error("Attempt #%d. Failed uploading %s to %s/%s. \n\tReason: %s" %
                         (count + 1, source_database, self.bucket, dest_database, e))

            except ClientError as e:
                log.error("Attempt #%d. Failed uploading %s to %s/%s. \n\tReason: %s" %
                         (count + 1, source_database, self.bucket, dest_database, e))

            except ParamValidationError as e:
                log.error("Attempt #%d. Failed uploading %s to %s/%s. \n\tReason: %s" %
                         (count + 1, source_database, self.bucket, dest_database, e))

            except () as e:
                log.error("Attempt #%d. Failed uploading %s to %s/%s. \n\tUnknown error occured $s" %
                         (count + 1, source_database, self.bucket, dest_database, e ))

            else:
                # Success. Log it, break out of the loop
                log.debug("Uploaded file %s" % source_database )
                break
    
        return count

# =============================================================================
#                    Class S3BackupGenerator
# =============================================================================
class S3BackupGenerator(ReportGenerator):
    
    def run(self):
        import user.s3backup
        
        # determine how much logging is desired
        log_success = to_bool(self.skin_dict.get('log_success', True))
        
        t1 = time.time()
        try:
            S3_backup = user.s3backup.S3Backup( bucket          = self.skin_dict['S3_BUCKET'],
                                                profile         = self.skin_dict['AWS_Profile'],
                                                region          = self.skin_dict['AWS_Region'],
                                                weewx_root      = self.config_dict['WEEWX_ROOT'],
                                                sqlite_root     = self.config_dict['DatabaseTypes']['SQLite']['SQLITE_ROOT'],
                                                database_name   = self.config_dict['Databases']['archive_sqlite']['database_name'])
        
        except KeyError as e:
            log.error("S3BackupGenerator: S3 Backup not requested. Skipped with error: %" % (e))
            return
        
        try:
            n = S3_backup.run()
        except () as e:
            log.error("S3BackupGenerator: Caught exception: %s" % (e))
            return
        
        if log_success:
            t2 = time.time()
            log.info("S3BackupGenerator: AWS-S3 copied files to S3 in %d attemps which took in %0.2f seconds" % ((n + 1), (t2 - t1)))

# =============================================================================
#                    Main
# =============================================================================
if __name__ == '__main__':
    import configobj

    import weewx
    import weeutil.logger

    weewx.debug = 1

    weeutil.logger.setup('S3Backup', {})
    
    if len(sys.argv) < 2:
        print("""Usage: S3Backup.py path-to-configuration-file [path-to-be-ftp'd]""")
        sys.exit(weewx.CMD_ERROR)

    try:
        config_dict = configobj.ConfigObj(sys.argv[1], file_error=True, encoding='utf-8')
    except IOError:
        print("Unable to open configuration file %s" % sys.argv[1])
        raise

    S3_upload = S3Backup(config_dict['StdReport']['AWS-S3']['S3_BUCKET'],
                         config_dict['StdReport']['AWS-S3']['AWS_Profile'],
                         config_dict['StdReport']['AWS-S3']['AWS_Region'],
                         config_dict['WEEWX_ROOT'],
                         config_dict['DatabaseTypes']['SQLite']['SQLITE_ROOT'],
                         config_dict['Databases']['archive_sqlite']['database_name'])

    print("\n========================================================================================\n")
    print("\tS3Backup started at: " + datetime.now().strftime('%d-%m-%Y %H:%M:%S') + " with the following parameters\n")
    print("\tBucket\t\t\tProfile\tRegion\tSQLITE Root\tDatabase Name")
    print("\t",
          config_dict['StdReport']['AWS-S3']['S3_BUCKET'],
          config_dict['StdReport']['AWS-S3']['AWS_Profile'],
          config_dict['StdReport']['AWS-S3']['AWS_Region'],
          config_dict['WEEWX_ROOT'],
          config_dict['DatabaseTypes']['SQLite']['SQLITE_ROOT'],
          config_dict['Databases']['archive_sqlite']['database_name'])
    print("\n========================================================================================\n")

    S3_upload.run()
