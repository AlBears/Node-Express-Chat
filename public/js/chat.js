var socket = io();

function scrollToBottom() {
  var messages = $('#messages'),
      newMessage = messages.children('li:last-child');
      clientHeight = messages.prop('clientHeight'),
      scrollTop = messages.prop('scrollTop'),
      scrollHeight = messages.prop('scrollHeight'),
      newMessageHeight = newMessage.innerHeight(),
      lastMessageHeight = newMessage.prev().innerHeight();

  if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
    messages.scrollTop(scrollHeight);
  }
}

socket.on('connect', function() {
  console.log('connected to the server');

});

socket.on('disconnect', function() {
  console.log('Disconnected from server');
});

socket.on('newMessage', function(message) {

  var template = $('#message-template').html(),
      formattedTime = moment(message.createdAt).format('h:mm a'),
      html = Mustache.render(template, {
        text: message.text,
        from: message.from,
        createdAt: formattedTime
      });

  $('#messages').append(html);
  scrollToBottom();
});

socket.on('newLocationMessage', function(message) {
  var formattedTime = moment(message.createdAt).format('h:mm a'),
      template = $('#location-message-template').html(),
      html = Mustache.render(template, {
        from: message.from,
        url: message.url,
        createdAt: formattedTime
  });

  $('#messages').append(html);
  scrollToBottom();
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