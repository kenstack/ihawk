
var uart = require('comlink2-uart');
var extras = require('./get-rtc');

var Serial = require('serialport');


function transport (session) {
  // var usb = require('comlink2-uart/lib/usb');
  // var stream = usb( );
  var stream = new Serial.SerialPort('/dev/serial/by-id/usb-0a21_8001-if00-port0', {bufferSize: 64});
  stream.on('error', console.error.bind(console, "ERROR TRANSPORT"));
  stream.on('disconnect', console.error.bind(console, "DISCONNECT TRANSPORT"));
  stream.on('close', console.error.bind(console, "CLOSE TRANSPORT"));
  // stream.open(console.log.bind(console, 'OPENED') );
  stream.open(session.bind(stream));

  return stream;
  var transport = uart(stream);
  transport.duplex = stream;
  console.log("TRANSPORT", transport);
  return transport;
}

module.exports.transport = transport;
