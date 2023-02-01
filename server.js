const io = require('socket.io')(8000, {
    cors: {
        origin: '*'
    }
});

const users = {};

io.on('connection', socket => {
    // console.log(socket.id);
    socket.on('new-user-joined', username => {
        // console.log('New user: ', username);
        users[socket.id] = username;
        socket.broadcast.emit('user-joined', username);
    });

    socket.on('send', message => {
        socket.broadcast.emit('receive', {message: message, username: users[socket.id]});
    });

    socket.on('disconnect', message => {
        socket.broadcast.emit('leave', {username: users[socket.id]});
        delete users[socket.id];
    });
});