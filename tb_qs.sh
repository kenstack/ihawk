#!/bin/bash
echo "Content-type: text/html"
set -x
echo""
echo "<html><head><title>INSCRIPT</title></head>"
echo "<body>"
#echo $QUERY_STRING | tee testq
#tb="${QUERY_STRING//%20/ }"
#echo $tb | tee testq2

#QUERY_STRING="duration=30&rate=1.0&serial=808661&port=/dev/ttyUSB0&dir=/home/pi"
#saveIFS=$IFS
#IFS='=&'
IFS='&'; set -f
for i in $QUERY_STRING; do
    declare "$i"
done
unset IFS


#parm=($QUERY_STRING)
#IFS=$saveIFS

echo $duration
echo $rate
echo $serial
echo $port
echo $dir


$dir/decoding-carelink/bin/mm-temp-basals.py set --rate $rate --duration $duration --serial $serial --port $port --init


sleep 2
# press the esc key, so we can see the results on the pump
$dir/decoding-carelink/bin/mm-press-key.py --port /dev/ttyUSB0 --serial 808661 esc 

echo""
echo "</body></html>"
