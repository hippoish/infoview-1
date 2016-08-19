console.log('socket.js loaded');
// wait for the doucment to load before performing the following
$(document).ready(function() {
  var socket = io();
  console.log(socket);
  $('#submit-name').on('click', function(e) {
    e.preventDefault();
    socket.emit('new person', $('#name').val());
  })
  $('form').submit(function(){
		socket.emit('chat message', $('#name').val() + ': ' + $('#msg').val())
		$('#msg').val('')
		return false
	})

  socket.on('new message', function(msg){
    $('#messages').append($('<li>').text(msg));
  })

  socket.on('update clients', function(clients) {
    $users = $('#connected-users')
    $users.empty();
    console.log(clients);
    for (var prop in clients) {
      $users.append('<li style="list-style: none;">' + clients[prop] + '</li>');
    }
  })
});
