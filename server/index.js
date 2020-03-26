const server = require('http').createServer();
const io = require('socket.io')(server);
const PORT = process.env.PORT || 8080;
const events = require('./events');
const { createUser, createMessage, doesUserExist } = require('./utils');

const users = {};
const messages = [];

io.on('connection', socket => {
    console.log('New connection', socket.id);

    socket.on(events.VERIFY_USER, (userName, callback) => {
        if(doesUserExist(userName, users)) {
            console.log('user exists')
            callback({ userExists: true });
        } else {
            const user = createUser(userName, socket.id);
            users[socket.id] = user;
            callback({ user });
            io.emit(events.USERS, users);
        }
    });

    socket.on(events.MESSAGE, (message) => {
        const msg = createMessage(message.sender, message.text);
        messages.push(msg);
        io.emit(events.MESSAGE, messages);
    });

    socket.on(events.DISCONNECT, () => {
        delete users[socket.id];
        io.emit(events.USERS, users);
    });

    socket.on(events.TYPING, (response) => {
        io.emit(events.TYPING, response);
    });
});


server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});