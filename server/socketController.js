const { isUserOnline, addOnlineUser, deleteOnlineUser, getSocketId } = require("./onlineUsers");

const socketController = (server) => {
    const io = require("socket.io")(server, {
        cors: {
          origin: process.env.ORIGIN,
          methods: ["GET", "POST"]
        }
      });
      
      io.on("connection", (socket) => {
        console.log("a user connected");

        socket.on("go-online", (userId) => {
          if (!isUserOnline(userId)) {
            addOnlineUser(userId, socket.id);
          }
          
          joinRooms(socket, userId);
        });
      
        socket.on("new-message", (data) => {
          sendMessage(io, socket, data);
        });

        socket.on("logout", (userId) => {
          if (isUserOnline(userId)) {
            deleteOnlineUser(userId, socket.id);
            leaveRooms(socket, userId);
          }
        });
      });

  const joinRooms = (socket, userId) => {
    // TODO: Need to fetch all conversation ids mapped to userId
    // Then socket joins room
    // And emits the add online user message

    socket.join("tempRooms");
    console.log("User " + userId + " joined room");
    // send the user who just went online to everyone else who is already online
    socket.broadcast.emit("add-online-user", userId);
  }

  const leaveRooms = (socket, userId) => {
    for (let room of socket.rooms) {
      socket.to(room).emit("remove-offline-user", userId);
      console.log("User " + userId + " left room");
    }
  }

  const sendMessage = (io, socket, data) => {
    const room = data.message.conversationId.toString();

    socket.join(room);
    
    if (isUserOnline(data.recipientId)) {
      // get the actual socket object of this user's socketId and join room
      // ex: socketOfOtherUser.join(room)
    }

    // Note: For testing purposes
    console.log("message: " + data.message.text);

    socket.to(room).emit("new-message", {
      message: data.message,
      sender: data.sender
    });
  }
}

module.exports = socketController;