var ws = new WebSocket("ws://localhost:3000/chat");

ws.onopen = function (event) {
  initializeChatClient();
};

function initializeChatClient() {
  var chatBox = document.getElementById('chatbox');
  var messageInput = chatBox.querySelector('.messageInput');
  var sendButton = chatBox.querySelector('.send');
  var messages = document.getElementById('messages');

  ws.onmessage = function(event) {
    var node = document.createElement('p');
    node.classList.add('message');
    var msg = JSON.parse(event.data);
    node.innerText = msg.clientId + ": " + msg.message;
    messages.appendChild(node);
  }

  sendButton.addEventListener('click', function(){
    var message = messageInput.value;
    if (!message) {
      alert('Please enter a message');
      return;
    }
    ws.send(JSON.stringify({message: message}));
    messageInput.value = "";
  });
}
