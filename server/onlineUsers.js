const onlineUsers = {};

const isUserOnline = (userId) => {
    return onlineUsers.hasOwnProperty(userId);
}

const addOnlineUser = (userId, socketId) => {
    return onlineUsers[userId] = [socketId];
}

const deleteOnlineUser = (userId) => {
    return delete onlineUsers[userId];
}

const getOnlineUsers = () => {
    return onlineUsers;
}

const getSocketId = (userId) => {
    return onlineUsers[userId]
}

module.exports = {
    isUserOnline,
    addOnlineUser,
    deleteOnlineUser,
    getOnlineUsers,
    getSocketId
};
