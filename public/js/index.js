var socket = io();

socket.on('connect', function() {
  console.log('connected to the server');

});

socket.on('disconnect', function() {
  console.log('Disconnected from server');
});

socket.on('newMessage', function(message) {
  var li = $('<li></li>');
  li.text(`${message.from}: ${message.text}`)

  $('#messages').append(li);
});

socket.emit('createMessage', {
  from: 'Frank',
  text: 'Hello'
}, function (message) {
  console.log('Got it', message);
});

$('#message-form').on('submit', function(e) {
  e.preventDefault();

  socket.emit('createMessage', {
    from: 'User',
    text: $('[name=message]').val()
  }, function(){

  })
});
