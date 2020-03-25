const server = require('http').createServer();
const io = require('socket.io')(server);
const PORT = process.env.PORT || 8080;
const { VERIFY_USER, MESSAGE } = require('./events');
const { createUser, createMessage, doesUserExist } = require('./utils');

const users = [];
const messages = [];

io.on('connection', socket => {
    console.log('New connection', socket.id);

    socket.on(VERIFY_USER, (userName, callback) => {
        if(doesUserExist(userName, users)) {
            console.log('user exists')
            callback({ userExists: true });
        } else {
            const user = createUser(userName);
            users.push(user);
            console.log(users);
            callback({ user });
        }
    });

    socket.on(MESSAGE, (message) => {
        const msg = createMessage(message.sender, message.text);
        messages.push(msg);
        io.emit(MESSAGE, messages);
    })
})

server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});