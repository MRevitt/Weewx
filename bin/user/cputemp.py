#!/bin/env python3
#-----------------------------------------------------------------------------------------------------------------------------------
# Routine Name: cputemp.py
# Author:       Mike Revitt
# Date:         19/03/2020
#------------------------------------------------------------------------------------------------------------------------------------
# Revision History    Push Down List
# -----------------------------------------------------------------------------------------------------------------------------------
# Date        | Name        | Description
# ------------+-------------+--------------------------------------------------------------------------------------------------------
#             |             |
# 23/03/2020  | M Revitt    | Convert Fahrenheit to Celcius where requried
# 19/03/2020  | M Revitt    | Initial version
#-------------+-------------+--------------------------------------------------------------------------------------------------------
# Description:  Reads the CPU Temperature and populates the extraTemp1 variable with this data
#               Converts all data into Celcius first
#
# Issues:       None
#
# ***********************************************************************************************************************************
# Copyright 2020 Mike Revitt <mike@cougar.eu.com>. All Rights Reserved.
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
"""Gets the CPU temperature on a Rasberry Pi"""

import  weewx
from    weewx.engine    import  StdService
from    gpiozero        import  CPUTemperature

class AddCpuTemp(StdService):

    def __init__(self, engine, config_dict):

      # Initialize my superclass first:
      super(AddCpuTemp, self).__init__(engine, config_dict)

      # Bind to any new archive record events:
      self.bind(weewx.NEW_ARCHIVE_RECORD, self.new_archive_record)

    def new_archive_record(self, event):

        cpu = CPUTemperature()
        
        if event.record['usUnits'] == weewx.US:
            event.record['extraTemp1'] = ( cpu.temperature * 1.8 ) + 32
        else:
            event.record['extraTemp1'] = cpu.temperature
