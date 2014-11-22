
## ihawk
 
JQuery Mobile based application to query status and set temp basal rates on Medtronic insulin pumps. ihawk is based on Ben West's amazing decocare tools (add html link).   Utilizes a Raspberry Pi running an Apache 2 server to run an interface for CGI scripts that run decocare and the carelink stick.  

FOR RESEARCH USE ONLY - USE AT OWN RISK - NO WARRANTY - SEE LICENSE

## Installation
 
1. install apache 2 server on Raspberry Pi - make sure you can reach the Pi from your device via the browser and see the hello world default page from your phones browser
2. install decocare tools in home/pi/decoding-carelink.  Run decocare test files to ensure you can reach the stick and the pump.  ihawk requires these to be functional.
3. copy index.html, the ajax spinner, and the .js and .css files in var/www on the pi.  
4. copy his.sh and tb_qs.sh to /usr/lib/cgi-bin on the pi.  Make sure their permissions are executable
5. copy mm-latest2.py /home/pi/decoding-carelink/bin - this is a slightly modified version of mm-latest.py to help parsing

## Installation Tips

1. execute insert.sh from decocare before doing anything after install.  Do an ls /dev/ttyUSB0.  If yo dont see the port the stick something is wrong.  Debug that before proceeding.  
2. open the port permission using sudo chmod 755 /dev/ttyUSB0 
3. All my work has been done with an original carelink stick not the contour USB.  If you are going to use a contour USB it should work but the ID's in insert.sh need to be changed appropriately.  After you insert the stick you can do an lsusb to find out the Id's and then do a modprobe.  I plan to investigate this further at some point.
4. the settings tab in ihawk uses local storage to save settings.  Make sure your browser isn't in private mode.

 
## Usage
 
TODO: Write usage instructions
 
## Contributing
 
1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D
 
## History
 
TODO: Write history
 
## Credits
 
* Ben West - Decocare tools
* dynatable.js
* jquery / jquery mobile
* apache 2 server
 
## License
 
TODO: See license.text file GPL V3 License
]]></content>
  <tabTrigger>readme</tabTrigger>
</snippet>
