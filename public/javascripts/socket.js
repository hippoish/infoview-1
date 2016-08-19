console.log('socket.js loaded');
// wait for the doucment to load before performing the following
$(document).ready(function() {
  var socket = io();
  console.log(socket);
  $('form').submit(function(){
		socket.emit('chat message', $('#name').val() + ': ' + $('#msg').val())
		$('#msg').val('')
		return false
	})

  socket.on('new message', function(msg){
    $('#messages').append($('<li>').text(msg));
  })
});
