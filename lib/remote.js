
var uart = require('comlink2-uart');
var extras = require('./get-rtc');

// var Serial = require('serialport');


function transport ( ) {
  var usb = require('comlink2-uart/lib/usb');
  // var stream = new Serial.SerialPort('/dev/serial/by-id/usb-0a21_8001-if00-port0', {bufferSize: 64});
  var stream = usb( );
  stream.on('error', console.error.bind(console, "USB"));
  stream.open( );
  var transport = uart(stream);
  console.log("TRANSPORT", transport);
  return transport;
}

module.exports.transport = transport;
