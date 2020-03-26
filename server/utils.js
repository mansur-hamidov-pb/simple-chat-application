const { uuid } = require('uuidv4');

module.exports.createUser = (username, socketId) => {
    return {
        id: socketId,
        username
    };
};

module.exports.createMessage = (sender, message, type = "text") => {
    return {
        id: uuid(),
        sender,
        message,
        type,
        createdAt: new Date().getTime()
    };
};

module.exports.doesUserExist = (username, users) => {
    for (id in users) {
        if (users[id].username === username) {
            return true;
        }
    }
}