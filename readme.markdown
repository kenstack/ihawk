
## ihawk
 
JQuery Mobile based application to query status and set temp basal rates on Medtronic insulin pumps remotely. ihawk is based on Ben West's amazing decocare tools (http://github.com/bewest/decoding-carelink/).   Utilizes a Raspberry Pi running an Apache 2 server to run an interface for CGI scripts that run decocare and the carelink stick.  

FOR RESEARCH USE ONLY - USE AT OWN RISK - NO WARRANTY - SEE LICENSE

## Equipment
1. Raspberry Pi - I use a B+ but an A Series should work too
2. wifi dongle or ethernet
3. carelink stick (contour USB should work but see below)
4. medtronic pump - I have used it on a 515, 722 and 723

## Installation
 
1. Install apache 2 server on Raspberry Pi - make sure you can reach the Pi from your device via the browser and see the hello world default page from your phones browser
2. Install decocare tools in home/pi/decoding-carelink.  Follow instructions on installing python as well.  Run decocare test files to ensure you can reach the stick and the pump.  ihawk requires these to be functional.
3. Copy index.html, the ajax spinner, and the .js and .css files in /var/www on the pi.  
4. Copy his2.sh and tb_qs.sh to /usr/lib/cgi-bin on the pi.  Make sure their permissions are executable
5. Copy mm-latest2.py /home/pi/decoding-carelink/bin - this is a slightly modified version of mm-latest.py to help parsing

## Installation Tips

1. Execute insert.sh from decocare before doing anything after install.  Do an ls /dev/ttyUSB0.  If you dont see the port then something is wrong.  Debug that before proceeding.  
2. Change the port permission using sudo chmod 755 /dev/ttyUSB0 
3. All my work has been done with an original carelink stick not the contour USB.  If you are going to use a contour USB it should work but the ID's in insert.sh need to be changed appropriately.  After you insert the stick you can do an lsusb to find out the Id's and then do a modprobe.  I plan to investigate this further at some point.
4. The settings tab in ihawk uses local storage to save settings.  Make sure your browser isn't in private mode.
5. Add write permission to /usr/lib/cgi-bin 

 
## Usage

1. when you first browse to the server on the Pi go to settings and include your serial number and save it.  Avoids retyping.  
2. Press query pump - after about 20 seconds you should see results.  Note that everything except the default basal rate is read directly from the pump.  The default basal rates are inferred, ie we know the pump time and we know the default settings, so we can calculate which basal rate is currently running.  The active insulin calculation is done using Walsh's active insulin curves and accounts for the insulin duration you have programmed into the pump.  We have 3-6 hours in the calc software today but plan to add 7 and 8 as time permits.  Take a look at iob.js for the calcs.
3. To remotely set the pump's temp basal the pump MUST be in unit mode for temp basal, NOT percent. 
4. Use the sliders to set the temp basal rate and duration.  Setting both to zero will turn temp basal off. 

THIS IS FOR TEST ONLY. 
 
## Contributing
 
1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D
 
## Future Plans
 
1. Add the ability to set a threshold suspend functionality for medtronic pumps from Nightscout data (first step towards closing the loop)
2. Upload pump data to Mongolab automatically and allow users to access their pump data as they wish
 
## Credits
 
* Ben West - Decocare tools
* dynatable.js
* jquery / jquery mobile
* apache 2 server
* Nightscout Project
* John Costik for getting me started down this path
 
## License
 
See license.text file in repo

