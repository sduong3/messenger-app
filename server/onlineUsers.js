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

// For testing purposes
const getOnlineUsers = () => {
    return onlineUsers;
}

module.exports = {
    isUserOnline,
    addOnlineUser,
    deleteOnlineUser,
    getOnlineUsers,
};
