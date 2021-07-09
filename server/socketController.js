const { isUserOnline, addOnlineUser, deleteOnlineUser, getSocketId, getOnlineUsers } = require("./onlineUsers");
const { Conversation } = require("./db/models");

const socketController = (server) => {
    const io = require("socket.io")(server, {
        cors: {
          origin: process.env.ORIGIN,
          methods: ["GET", "POST"],
          credential: true
        }
      });
      
      io.use((socket, next) => {
        if (!socket.handshake.headers.cookie.includes('messenger-token')){
          return socket.disconnect();
        }
        next();
      }).on("connection", (socket) => {
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
    Conversation.fetchConversationsById(userId)
      .then((conversations) => {
        const rooms = conversations.map((conversation) => {
          return conversation.id.toString();
        });

        socket.join(rooms);
        
        for (let room of rooms) {
          socket.to(room).emit("add-online-user", userId);
        }
      })
      .catch(err => {
        console.error(err);
      })
  }

  const leaveRooms = (socket, userId) => {
    for (let room of socket.rooms) {
      socket.to(room).emit("remove-offline-user", userId);
    }
  }

  const sendMessage = (io, socket, data) => {
    console.log(getOnlineUsers());

    const room = data.message.conversationId.toString();

    socket.join(room);
    
    if (isUserOnline(data.recipientId)) {
      const socketId = getSocketId(data.recipientId);

      const currSocket = io.sockets.sockets.get(socketId);
      currSocket.join(room);
      console.log(`Other User ${socketId} joined room too`);
    }

    socket.to(room).emit("new-message", {
      message: data.message,
      sender: data.sender
    });
  }
}

module.exports = socketController;