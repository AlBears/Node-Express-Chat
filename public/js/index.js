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

socket.on('newLocationMessage', function(message) {
  var a = $('<a target="_blank"></a>'),
      li = $('<li></li>');
  a.attr('href', message.url);
  a.text('My Current Location');
  li.text(`${message.from}: `);
  li.append(a);

  $('#messages').append(li);
});

$('#message-form').on('submit', function(e) {
  e.preventDefault();

  var messageTextbox = $('[name=message]');
  socket.emit('createMessage', {
    from: 'User',
    text: messageTextbox.val()
  }, function(){
    messageTextbox.val('');
  })
});

var locationButton = $('#send-location');
locationButton.on('click', function () {
  if (!navigator.geolocation) {
    return alert('Geolocation not supported by your browser')
  }

  locationButton.attr('disabled', 'disabled').text('Sending location...');

  navigator.geolocation.getCurrentPosition(function(position) {
    locationButton.removeAttr('disabled').text('Send location');
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, function () {
    locationButton.removeAttr('disabled').text('Send location');
    alert('Unable to fetch location.');
  })
})
