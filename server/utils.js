const { uuid } = require('uuidv4');

module.exports.createUser = (username) => {
    return {
        id: uuid(),
        username
    };
};

module.exports.createMessage = (sender, message) => {
    return {
        id: uuid(),
        sender,
        message
    };
};

module.exports.doesUserExist = (username, users) => {
    console.log('checking for username', username);
    return users.some(user => user.username === username.trim())
}