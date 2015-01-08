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
mm-latest.py --serial $serial --init --rf-minutes 3 360 --parser-out history.json | tee ldata > /dev/null
tr '\n' ' ' < history.json

echo""
echo "</body></html>"













