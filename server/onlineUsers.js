const onlineUsers = {};

const checkIfUserOnline = (userId) => {
    return onlineUsers.hasOwnProperty(userId);
}

const addOnlineUser = (userId, socketId) => {
    return onlineUsers[userId] = [socketId];
}

const deleteOnlineUser = (userId) => {
    return delete onlineUsers[userId];
}

const getSocketId = (userId) => {
    return onlineUsers[userId];
}

module.exports = {
    checkIfUserOnline,
    addOnlineUser,
    deleteOnlineUser,
    getSocketId
};
