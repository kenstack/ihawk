
var commands = require('comlink2-uart/lib/session/commands');

var moment = require('moment');

function ReadRTC (opts) {
  return commands.create({
    name: 'ReadRTC'
  , op: 122
  , decode: function (data) {
    var d = {
      hour  : (data[0]),
      minute: (data[1]),
      second: (data[2]),
      year  : 2000 + (data[4] & 0x1F),
      month : (data[5]),
      day   : (data[6]),
    }
    var date = [d.year, d.month, d.day].join('-');
    var time = [d.hour, d.minute, d.second].join(':');
    return moment([date, time].join('T'));
  }
  });
}

commands.register('read_clock', ReadRTC);

module.exports = ReadRTC;

