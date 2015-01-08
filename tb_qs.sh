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



echo $duration
echo $rate
echo $serial
echo $port
echo $dir


$dir/decoding-carelink/bin/mm-temp-basals.py set --rate $rate --duration $duration --serial $serial --port $port --init


sleep 2
# press the esc key, so we can see the results on the pump
$dir/decoding-carelink/bin/mm-press-key.py --port $port --serial $serial esc 

echo""
echo "</body></html>"
