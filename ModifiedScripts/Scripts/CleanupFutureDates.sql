select datetime from et where datetime > 1402516400;
select datetime from uv where datetime > 1402516400;
select datetime from barometer where datetime > 1402516400;
select datetime from dewpoint where datetime > 1402516400;
select datetime from extratemp1 where datetime > 1402516400;
select datetime from heatindex where datetime > 1402516400;
select datetime from inhumidity where datetime > 1402516400;
select datetime from intemp where datetime > 1402516400;
select datetime from outhumidity where datetime > 1402516400;
select datetime from outtemp where datetime > 1402516400;
select datetime from radiation where datetime > 1402516400;
select datetime from rain where datetime > 1402516400;
select datetime from rainrate where datetime > 1402516400;
select datetime from rxcheckpercent where datetime > 1402516400;
select datetime from wind where datetime > 1402516400;
select datetime from windchill where datetime > 1402516400;


update et set datetime = datetime - 94694400 where datetime > 1402614000;
update uv set datetime = datetime - 94694400 where datetime > 1402614000;
update barometer set datetime = datetime - 94694400 where datetime > 1402614000;
update dewpoint set datetime = datetime - 94694400 where datetime > 1402614000;
update extratemp1 set datetime = datetime - 94694400 where datetime > 1402614000;
update heatindex set datetime = datetime - 94694400 where datetime > 1402614000;
update inhumidity set datetime = datetime - 94694400 where datetime > 1402614000;
update intemp set datetime = datetime - 94694400 where datetime > 1402614000;
update outhumidity set datetime = datetime - 94694400 where datetime > 1402614000;
update outtemp set datetime = datetime - 94694400 where datetime > 1402614000;
update radiation set datetime = datetime - 94694400 where datetime > 1402614000;
update rain set datetime = datetime - 94694400 where datetime > 1402614000;
update rainrate set datetime = datetime - 94694400 where datetime > 1402614000;
update rxcheckpercent set datetime = datetime - 94694400 where datetime > 1402614000;
update wind set datetime = datetime - 94694400 where datetime > 1402614000;
update windchill set datetime = datetime - 94694400 where datetime > 1402614000;

Delete from  et   where datetime > 1402614000;
Delete from  uv   where datetime > 1402614000;
Delete from  barometer   where datetime > 1402614000;
Delete from  dewpoint   where datetime > 1402614000;
Delete from  extratemp1   where datetime > 1402614000;
Delete from  heatindex   where datetime > 1402614000;
Delete from  inhumidity   where datetime > 1402614000;
Delete from  intemp   where datetime > 1402614000;
Delete from  outhumidity   where datetime > 1402614000;
Delete from  outtemp   where datetime > 1402614000;
Delete from  radiation   where datetime > 1402614000;
Delete from  rain   where datetime > 1402614000;
Delete from  rainrate   where datetime > 1402614000;
Delete from  rxcheckpercent   where datetime > 1402614000;
Delete from  wind   where datetime > 1402614000;
Delete from  windchill   where datetime > 1402614000;



