#!/bin/env python3
#-----------------------------------------------------------------------------------------------------------------------------------
# Routine Name: ecowitt.py
# Author:       Mike Revitt
# Date:         14/01/2021
#------------------------------------------------------------------------------------------------------------------------------------
# Revision History    Push Down List
# -----------------------------------------------------------------------------------------------------------------------------------
# Date        | Name        | Description
# ------------+-------------+--------------------------------------------------------------------------------------------------------
#             |             |
# 14/01/2021  | M Revitt    | Initial version
#-------------+-------------+--------------------------------------------------------------------------------------------------------
# Description:  Reads the Temperature and Humidity from and ECOWITT_PATH which is where the Ecwitt weather station places the data files
#               Converts all data into Celcius then populates the WeeWX database
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
"""Gets the temperatures and humidy from Ecowitt"""

import  os
import  weewx
from    weewx.engine  import  StdService
from    stat          import  S_ISREG, ST_MTIME, ST_MODE

ECOWITT_PATH  = '/var/www/html/ecowitt'

class AddEcowittData(StdService):

    def __init__(self, engine, config_dict):

      # Initialize my superclass first:
      super(AddEcowittData, self).__init__(engine, config_dict)

      # Bind to any new archive record events:
      self.bind(weewx.NEW_ARCHIVE_RECORD, self.new_archive_record)

    def new_archive_record(self, event):

        lEcowittFiles =  (os.path.join(ECOWITT_PATH, sFiles)  for sFiles          in os.listdir(ECOWITT_PATH))
        lEcowittFiles = ((os.stat(sFullPath), sFullPath)      for sFullPath       in lEcowittFiles)
        lEcowittFiles = ((stat[ST_MTIME],     sFullPath)      for stat, sFullPath in lEcowittFiles if S_ISREG(stat[ST_MODE]))
        sDelFile      = ''

        for cDate, sFullPath in sorted(lEcowittFiles, reverse=False):
            if os.path.exists(sDelFile):
                os.remove(sDelFile)
                sDelFile = sFullPath
            else:
                sDelFile = sFullPath

        dEcowittData = {}
        ecowittData  = open(sFullPath, 'r')
        for sLineIn in ecowittData:
            if "[" in sLineIn:
                sKey    = sLineIn.split('[',  1)[1].split(']', 1)[0]
                sValue  = sLineIn.split('=>', 1)[1].strip()
                dEcowittData[sKey] = sValue

        ecowittData.close()

        event.record['extraTemp3']  = float(dEcowittData['tempinf'])
        event.record['extraHumid1'] = float(dEcowittData['humidityin'])
        event.record['extraTemp2']  = float(dEcowittData['tempf'])
        event.record['extraHumid2'] = float(dEcowittData['humidity'])
