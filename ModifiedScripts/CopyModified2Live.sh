BACKUP_LOCATION=/Users/Mike/Dropbox/Weewx/Backups/Current
SOURCE=/Users/Mike/Dropbox/Weewx/ModifiedScripts/3.8
DESTINATION=/Groups/revitt/WebSites/Weewx


Echo    Backup Production Scripts into $BACKUP_LOCATION
Echo

rm -fr  $BACKUP_LOCATION/*

cp -vfr $DESTINATION/*     $BACKUP_LOCATION/

Echo
Echo
Echo
Echo    Copy New Scripts into $DESTINATION
Echo

cp -vr  $SOURCE/MountWeather/*          $DESTINATION/MountWeather/
cp -vr  $SOURCE/bin/*                   $DESTINATION/bin/
cp -vr  $SOURCE/Skins/*                 $DESTINATION/skins/

Echo
Echo    Done .....
Echo
