const socket = io('http://127.0.0.1:8000');

const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector(".container");

const append = (message, position) => {
    const messageElement = document.createElement('div');
    messageElement.innerHTML = message;
    messageElement.classList.add(position,'message');
    messageContainer.append(messageElement);
}

const handleUserJoined = (username) => {

}

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`, 'right');
    socket.emit('send', message);
    messageInput.value = "";
});

const username = prompt("Enter your name to join");
socket.emit('new-user-joined', username);

socket.on('user-joined', username=> {
    append(`<strong>${username}</strong> joined the chat`, 'right');
});

socket.on('receive', data => {
    append(`${data.username}: ${data.message}`, 'left');
});

socket.on('leave', data => {
    append(`${data.username} has left the chat!`, 'right');
});