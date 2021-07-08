const onlineUsers = require("./onlineUsers");

const socketController = (server) => {
    const io = require("socket.io")(server, {
        cors: {
          origin: process.env.ORIGIN,
          methods: ["GET", "POST"]
        }
      });
      
      io.on("connection", (socket) => {

        socket.on("go-online", (id) => {
          if (!onlineUsers.isUserOnline(id)) {
            onlineUsers.addOnlineUser(id, socket.id);
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
          if (onlineUsers.isUserOnline(id)) {
            onlineUsers.deleteOnlineUser(id, socket.id);
            socket.broadcast.emit("remove-offline-user", id);
          }
        });
      });
}

module.exports = socketController;