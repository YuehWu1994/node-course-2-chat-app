var socket = io();

socket.on('connect', function(){
  console.log('connect to server');

});

socket.on('disconnect', function() {
  console.log('Disconnect to server');
})

socket.on('newMessage', function(message){
  console.log('new message', message);
  var li = jQuery('<li></li>');
  li.text(`${message.from}: ${message.text}`);

  jQuery('#message').append(li);
})



// jQuery listener
jQuery('#message-form').on('submit', function(e) {
  e.preventDefault();

  socket.emit('createMessage', {
    from: 'Frank',
    text: jQuery('[name=message]').val()
  }, function() {

  });

})
