var socket = io();

socket.on('connect', function() {
  console.log('connected to the server');

  socket.emit('createEmail', {
    message: 'Hello'
  });
});

socket.on('disconnect', function() {
  console.log('Disconnected from server');
});

socket.on('newEmail', function(email) {
  console.log('New email', email);
});
