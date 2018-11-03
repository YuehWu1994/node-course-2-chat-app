const path = require('path');
const http = require('http');
const publicPath = path.join(__dirname, '../public');
const socketIO = require('socket.io');

const {generateMessage} = require('./utils/message');
const express = require('express');
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);



app.use(express.static(publicPath));

// listen to event
io.on('connection', (socket) => {
  console.log('new user connected');

  socket.emit('newMessage', generateMessage('Admin', 'welcome to our app'));

  socket.broadcast.emit('newMessage', generateMessage('Admin', 'new use joined'));

  socket.on('createMessage', (message, callback) => {
    console.log('createMessage', message);
    io.emit('newMessage', generateMessage(message.from, message.text));
    callback('this is from server'
    );
    //broadcast: only received by other user
    // socket.broadcast.emit("newMessage", {
    //     from: newMessage.from,
    //     text: newMessage.text,
    //     createdAt: new Date().getTime()
    // });
  });

  socket.on('disconnect', () => {
    console.log('User was Disconnected');
  });
})

server.listen(port, () => {
  console.log(`server is on port ${port}`);
});
