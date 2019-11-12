BACKUP_LOCATION=/Users/Mike/Dropbox/Weewx/Backups/Current
SOURCE=/Users/Mike/Dropbox/Weewx/ModifiedScripts/3.8
DESTINATION=/Groups/revitt/WebSites/Weewx


Echo    Backup Templates into $BACKUP_LOCATION
Echo

cp -vr $DESTINATION/skins/*             $BACKUP_LOCATION/
cp -vr $DESTINATION/MountWeather/*.css  $BACKUP_LOCATION/
cp -vr $DESTINATION/MountWeather/*.js   $BACKUP_LOCATION/

Echo
Echo
Echo
Echo    Copy New Templates into $LIVE_DESTINATION/skins/Standard
Echo

cp -vr $SOURCE/skins/*          $DESTINATION/skins/
cp -vr $SOURCE/MountWeather/*   $DESTINATION/MountWeather/

Echo
Echo    Done .....
Echo
