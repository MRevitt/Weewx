#    Copyright (c) 2009-2015 Mike Revitt <mike@cougar.eu.com>
#    See the file LICENSE.txt for your rights.

import os.path
import subprocess
import datetime
import getpass
import weewx
from weewx.engine import StdService

# =============================================================================
#                    Class AWS_Sync
# =============================================================================

class S3_Sync(StdService):
    
    def run(self):
        
        try:
            self.local_root = os.path.join(config_dict['WEEWX_ROOT'], config_dict['AwsCli']['HTML_ROOT'])
       
            if 'LOG_FILE' in config_dict['AwsCli']:
                self.log_file = config_dict['AwsCli']['LOG_FILE']
            else:
                log_file = "subprocess.PIPE"
        
        if 'DRY_RUN' in self.skin_dict:
            s3_cmd = 's3 sync --dryrun'
        else:
            s3_cmd = 's3 sync'
        
        s3_root       = self.skin_dict['S3_ROOT']
        aws           = self.skin_dict['AWS']
        cache_control = '--cache-control'
        cache_age     = 'max-age=120'       # 2 minutes
        
        LogFile = open(log_file, "a+")
        LogFile.write("\nWebsite Syncronisation Executed at %s by %s\n" %( datetime.datetime.now(), getpass.getuser()))
        
        command = subprocess.Popen([aws, s3_cmd, local_root, s3_root, cache_control, cache_age ], stdout = LogFile )
        
        LogFile.close()

