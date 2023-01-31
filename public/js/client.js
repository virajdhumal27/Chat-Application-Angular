const socket = io('http://127.0.0.1:8000/public/');

const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector(".container");

const append = (message, position) => {
    const messageElement = document.createElement('div');
    messageElement.innerHTML = message;
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
}

const username = prompt("Enter your name to join");
socket.emit('new-user-joined', username);

socket.on('user-joined', username=> {
    append(`${username} joined the chat`, 'right');
});