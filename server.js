var express = require('express');

var app = express();
const PORT = process.env.PORT || 3000;

var server = app.listen(PORT);

app.use(express.static('public'));

var socket = require('socket.io');

var io = socket(server);

io.sockets.on('connection', function (socket) {
  console.log("new connection " + socket.id);

  socket.on('typingmessage', typingMessage)

  socket.on('smessage', textMessage);

  function textMessage(data) {
    io.sockets.emit('smessage', data)
    console.log(data);
  }

  function typingMessage(data) {
    socket.broadcast.emit('typingmessage', data)
  }
})

