// server side

console.log('server working');
var io = require('socket.io')();

// event listeners for new connection
io.on('connection', function(socket){
	// console.log(io);
	console.log('a new user connection:' + socket.id);
	socket.on('bolita', function(data){ //if message named bolita run function
		// console.log(data);
		io.emit('newBolita', data) //function sends out message
	})
	socket.broadcast.emit
});

//listens for connection and sends message received (io.emit) to client
io.on('connection', function(socket){
	socket.on('chat', function(data){
		// console.log(data);
		io.emit('message-received', data)
	});
})

module.exports = io;
