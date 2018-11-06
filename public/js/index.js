var socket = io();

socket.on('connect', function(){
  console.log('connect to server');

});

socket.on('disconnect', function() {
  console.log('Disconnect to server');
})

socket.on('newMessage', function(message){
  var formattedTime = moment(message.createAt).format('h:mm a');
  var template = jQuery('#message-template').html();

  var html = Mustache.render(template, {
    text: message.text,
    from: message.from,
    createAt: formattedTime
  });
  jQuery('#messages').append(html);
  // console.log('new message', message);
  // var li = jQuery('<li></li>');
  // li.text(`${message.from} ${formattedTime}: ${message.text}`);
  //
  // jQuery('#message').append(li);
})

socket.on('newLocationMessage', function(message) {
  var formattedTime = moment(message.createAt).format('h:mm a');
  var template = jQuery('#location-message-template').html();

  var html = Mustache.render(template, {
    from: message.from,
    url: message.url,
    createAt: formattedTime
  });

  jQuery('#messages').append(html);
})

// jQuery listener
jQuery('#message-form').on('submit', function(e) {
  e.preventDefault();

  var messageTestbox = jQuery('[name=message]');
  socket.emit('createMessage', {
    from: 'Frank',
    text: messageTestbox.val()
  }, function() {
    messageTestbox.val("");
  });
});

var locationButton = jQuery('#send-location');
locationButton.on('click', function () {
  if (!navigator.geolocation) {
    return alert('Geolocation not supported by your browser.');
  }

  locationButton.attr('disabled', 'disabled').text('sending location...')
  navigator.geolocation.getCurrentPosition(function (position) {
    locationButton.removeAttr('disabled').text('send location');
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, function () {
    locationButton.removeAttr('disabled').text('send location');
    alert('Unable to fetch location.');
  });
});
