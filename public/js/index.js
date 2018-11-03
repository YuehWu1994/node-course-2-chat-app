var socket = io();

socket.on('connect', function(){
  console.log('connect to server');


  socket.emit('createMessage', {
    from: 'fasfsjfklsfj@gmail.com',
    text: "this is Hack"
  })
});

socket.on('disconnect', function() {
  console.log('Disconnect to server');
})

socket.on('newMessage', function(message){
  console.log('new message', message);
})
