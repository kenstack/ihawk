
$(window).ready(function (ev) {
  console.log('window ready');
  var socket = io.connect( );
  socket.on('connect', function ( ) {
    console.log('connected to websocket');
    var serial=$("#idserial").val();
    socket.emit('serial', serial);
  });

  socket.on('clock', function (clock, msg) {
    console.log("CLOCK", clock, msg, arguments);
    var now = moment(clock);
    console.log("NOW", now, clock);
    $('#clock').trigger('now', now, clock);

  });
  socket.on('model', function (model, msg) {
    console.log("MODEL", model);
  });
  socket.on('history', function (history, msg) {
    console.log("HISTORY", history);
  });
  var serial=$("#idserial").val();
  $("#qpump").click(function(){
    socket.emit('query', serial);
  })
});
