var socket;

function setup() {
  socket = io.connect('https://warm-badlands-36892.herokuapp.com');

  socket.on('smessage', newMessage);
  socket.on('typingmessage', whostyping)
}

function newMessage(data) {
  var messageBox = document.querySelector("#messages");
  var newMessage = "<p>" + data.username + ": " + data.text + "</p>";
  messageBox.innerHTML += newMessage;


  var sender = document.querySelector(".typing");
  sender.innerHTML = "";

}

function whostyping(data) {
  var sender = document.querySelector(".typing");
  sender.innerHTML = data.name + " is typing..";
  console.log(data)
}

setup();


function inputText() {
  var text = document.querySelector("#text");
  var name = document.querySelector("#name").value;

  console.log('sending data: ' + text.value);
  var data = {
    username: name,
    text: text.value
  }

  text.value = "";

  socket.emit('smessage', data)
}

function typeMessage() {
  var name = document.querySelector("#name").value;
  var data = {
    name: name
  }

  socket.emit('typingmessage', data)
}

// on keyup add a text saying who is typing
document.querySelector("#text")
  .addEventListener("keyup", typeMessage);


// on submit add text to the box
document.querySelector("#submit")
.addEventListener("click", inputText);