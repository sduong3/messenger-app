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
          if (!onlineUsers.includes(id)) {
            onlineUsers.push(id);
          }
      
          socket.emit("just went online");
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
          if (onlineUsers.includes(id)) {
            userIndex = onlineUsers.indexOf(id);
            onlineUsers.splice(userIndex, 1);
            socket.broadcast.emit("remove-offline-user", id);
          }
        });
      });
}

module.exports = socketController;