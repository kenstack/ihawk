#!/bin/bash
echo "Content-type: text/html"
set -x
echo""
echo "<html><head><title>INSCRIPT</title></head>"
echo "<body>"
IFS='&'; set -f
for i in $QUERY_STRING; do
    declare "$i"
done
unset IFS



#echo $serial
#echo $port
#echo $dir




# get last 6 hours of data
# $dir/decoding-carelink/bin/mm-latest2.py 360 --init --serial  $serial | tee ldata > /dev/null
# python mm-latest2.py 360 --init --serial  $serial | tee ldata > /dev/null
mm-latest.py --serial $serial --init --rf-minutes 3 360 --parser-out history.json | tee ldata > /dev/null
<<EOT
sed -n -e 's/.*data://p' ldata 
#grab just history
sed -n "/.*bolusdata:/,/.*bolusdata:/p" ldata | tee part1 >/dev/null
#remove markers
sed -e 's/bolusdata://g' part1 > part2 
#remove line feeds
EOT
tr '\n' ' ' < history.json

echo""
echo "</body></html>"
# rm part1
# rm part2
# have to erase files
# leave ldata for debug purposes in case of app crash













