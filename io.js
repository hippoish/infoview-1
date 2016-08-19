// server side
var io = require('socket.io')();
var clientList = {};
io.on('connection', function (socket) {
  console.log('Client connected to socket.io!');
  io.emit('update clients', clientList);

  socket.on('chat message', function(msg) {
    io.emit('new message', msg);
  })

  socket.on('new person', function(name) {
    clientList[socket.client.id] = name;
    io.emit('update clients', clientList)
  });

  socket.on('disconnect', function() {
    delete clientList[socket.client.id];
    io.emit('update clients', clientList)
  })
});




module.exports = io;
