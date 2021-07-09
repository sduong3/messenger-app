const {
    checkOnlineUser,
    removeOnlineUser,
    addOnlineUser,
    getSocketId,
    checkIfUserOnline
  } = require("./onlineUsers");

const socketController = (server) => {
    const io = require("socket.io")(server);

    io.on("connection", (socket) => {
    socket.on("go-online", (id) => {
        if (!checkIfUserOnline(id)) {
            addOnlineUser(id, socket.id);
        }
        // send the user who just went online to everyone else who is already online
        socket.broadcast.emit("add-online-user", id);
    });

    socket.on("new-message", (data) => {
        socket.broadcast.emit("new-message", {
        message: data.message,
        sender: data.sender,
        });
    });

    socket.on("logout", (id) => {
        if (checkIfUserOnline(id)) {
            userIndex = onlineUsers.indexOf(id);
            onlineUsers.splice(userIndex, 1);
            socket.broadcast.emit("remove-offline-user", id);
        }
    });
    });
}

module.exports = socketController;
