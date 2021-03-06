const jwt = require("jsonwebtoken");
const cookie = require("cookie");
const { isUserOnline, addOnlineUser, deleteOnlineUser, getSocketId, getOnlineUsers } = require("./onlineUsers");
const { fetchConversationsByUserId } = require("./db/models/conversation");

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

        const token = cookie.parse(socket.handshake.headers.cookie)['messenger-token'];
        jwt.verify(token, process.env.SESSION_SECRET, (err, decoded) => {
          if(err){
            next(new Error("Cookie is not valid!"));
          } 
          next();
        })
      }).on("connection", (socket) => {
        socket.on("go-online", async (userId) => {
          // Handling multiple tabs by mapping multiple socketIds to user
          addOnlineUser(userId, socket.id);
          await joinRooms(socket, userId);
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

  const joinRooms = async (socket, userId) => {
      try {
        const conversations = await fetchConversationsByUserId(userId);
        const rooms = conversations.map((conversation) => conversation.id.toString());
        socket.join(rooms);
        
        for (let room of rooms) {
          socket.to(room).emit("add-online-user", userId);
        }
      } catch (err) {
        console.error(err);
      }
  }

  const leaveRooms = (socket, userId) => {
    for (let room of socket.rooms) {
      socket.to(room).emit("remove-offline-user", userId);
    }
  }

  const sendMessage = (io, socket, data) => {
    const room = data.message.conversationId.toString();
    socket.join(room);
    
    if (isUserOnline(data.recipientId)) {
      for (let socketId of getSocketId(data.recipientId)) {
        const currSocket = io.sockets.sockets.get(socketId);
        
        // Handles scenario where user reloads tab and that socket connection is destroyed
        if (currSocket) {
          currSocket.join(room);
        } 
      }
    }
    socket.to(room).emit("new-message", {
      message: data.message,
      sender: data.sender
    });
  }
}

module.exports = socketController;