// server side
var io = require('socket.io')();

io.on('connection', function (socket) {
  console.log('Client connected to socket.io!');
  socket.on('chat message', function(msg) {
    io.emit('new message', msg);
  })
});

module.exports = io;
