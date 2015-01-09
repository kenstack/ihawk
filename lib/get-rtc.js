
var commands = require('comlink2-uart/lib/session/commands');

var moment = require('moment');

function ReadRTC (opts) {
  return commands.create({
    name: 'ReadRTC'
  , op: 112
  , retries: 2
  , effectTime: 500
  , decode: function (data) {
    var d = {
      hour  : (data[0]),
      minute: (data[1]),
      second: (data[2]),
      year  : 2000 + (data[4] & 0x0F),
      month : (data[5]),
      day   : (data[6]),
    }
    var date = [d.year, d.month, d.day].join('-');
    var time = [d.hour, d.minute, d.second].join(':');
    return [date, time].join('T');
  }
  });
}

commands.register('read_clock', ReadRTC);

module.exports = ReadRTC;

if (!module.parent) {

  var usb = require('comlink2-uart/lib/usb');
  var create = require('comlink2-uart');
  var prog = process.argv.slice(1,2).pop( );
  var serial = process.argv.slice(2,3).pop( ) || process.env['SERIAL'];
  if (!serial) {
    console.log('usage: ', prog, 'SERIAL'); 
    process.exit(1);
  }
  console.log('howdy');
  var stream = usb( );
  stream.on('error', function ( ) {
    console.log("BAD ERROR", arguments);
    stream.close( );
    stream.end( );
  });

  stream.open( );
  var session = create(stream)

  var pump = session.session;
  pump.open(console.log.bind(console, "OPENED"))
      .serial(serial)
      // .power_on_ten_minutes(console.log.bind(console, 'POWER ON'))
      .prelude({minutes: 3})
      .ReadPumpModel(function model (res, msg) {
        session.model = res;
        console.log('MODEL', res);
        console.log("ERROR?", msg);
        msg.save( );
      })
      .tap(function ( ) {
        if (session.model) {
          this.read_clock(function (clock, msg) {
            console.log("XXX CLOCK", clock);
          });
          
        }
      })
      .end( )
    ;
      
}
