var socket = io();

function scrollToBottom() {
  // selector
  var messages = jQuery('#messages');
  var newMessage = messages.children('li:last-child');
  // height
  var clientHeight = messages.prop('clientHeight');
  var scrollTop = messages.prop('scrollTop');
  var scrollHeight = messages.prop('scrollHeight');
  var newMessageHeight = newMessage.innerHeight();
  var lastMessageHeight = newMessage.prev().innerHeight();


  if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight){
    messages.scrollTop(scrollHeight);
  }
}

socket.on('connect', function(){
  console.log('connect to server');
  var param = jQuery.deparam(window.location.serach);

  socket.emit('join', param, function(err){
    if(err){
      alert(err);
      window.location.href = '/';
    }else{
      console.log('No error');
    }
  });
});

socket.on('disconnect', function() {
  console.log('Disconnect to server');
})

socket.on('updateUserList', function(users) {
  var ol = jQuery('<ol></ol>');

  users.forEach(function(user) {
    ol.append(jQuery('<li></li>').text(user));
  });

  jQuery('#users').html(ol);
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
  scrollToBottom();
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
  scrollToBottom();
})

// jQuery listener
jQuery('#message-form').on('submit', function(e) {
  e.preventDefault();

  var messageTestbox = jQuery('[name=message]');
  socket.emit('createMessage', {
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
