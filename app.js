
var express = require('express');

var app = express( );
var server = require('http').Server(app);

var remote = require('./lib/remote');
var io = require('socket.io')(server);

var pump = null;
var serial = null;
function get_pump ( ) {
  var transport = remote.transport( );
  pump = transport.session
        .open(function ( ) {
          console.log('created usb transport');
        })
        ;
  return pump;
};

app.use(express.static(__dirname + "/static"));
app.get('/latest.json', function (req, res) {
  console.log("REQ PARAMS", req.params, 'QUERY', req.query);
  if (req.query.serial)
      pump = get_pump( )
      .serial(req.query.serial)
      ;
      pump = pump
      .prelude({minutes: 3})
      .ReadPumpModel(function rec_model (model, msg) {
        pump.model = model;
      })
      .tap(function ( ) {
        console.log('PUMP', pump.model, pump);
        if (pump.model) {
          this.ReadHistoryData({ page: 0 }, function (history, msg) {
            console.log(history, msg);
            res.send(history.json);
          });
        }
      })
});

io.on('connection', function (socket) {
  socket.on('query', function (data) {
    console.log('querying', data, serial);
    pump = get_pump( )
      .serial(serial)
      .prelude({minutes: 3})
      .ReadPumpModel(function rec_model (model, msg) {
        pump.model = model;
        socket.emit('model', model);
      })
      .read_clock(function (clock, msg) {
        console.log("CLOCK", arguments);
        socket.emit('clock', clock, msg);
      })
      .tap(function ( ) {
        if (pump.model) {
          this.ReadHistoryData({ page: 0 }, function (history, msg) {
            console.log(history, msg);
            socket.emit('history', history, msg);
          });
        }
      })
      .end( );

      ;

  });
  socket.on('serial', function (data) {
    console.log('serial data input', data, arguments);
    serial = data;
    // pump = (pump || get_pump( )).serial(data) ;
  });
});

server.listen(process.env.PORT || 8080);

