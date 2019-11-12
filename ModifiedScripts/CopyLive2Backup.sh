BASE_LOCATION=/Users/Mike/OneDrive/Mike/WebSites/Weewx
LIVE_FILES=/Groups/revitt/WebSites/Weewx
BACKUP_LOCATION=$BASE_LOCATION/Backups

Echo    Backup Production Scripts into $BACKUP_LOCATION
Echo

cp -vfr $LIVE_FILES/* $BACKUP_LOCATION/

Echo
Echo    Done .....
Echo
