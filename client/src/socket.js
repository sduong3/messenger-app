import io from "socket.io-client";
import store from "./store";
import {
  setNewMessage,
  removeOfflineUser,
  addOnlineUser,
} from "./store/conversations";

export const socketClient = {
  socket: null
};

const initSocket = user => {
  if (user) {
    socketClient.socket = io(window.location.origin, {
      withCredentials: true
    });
    
    socketClient.socket.on("connect", () => {
      console.log("Connected to server");
    
      socketClient.socket.on("add-online-user", (id) => {
        store.dispatch(addOnlineUser(id));
      });
    
      socketClient.socket.on("remove-offline-user", (id) => {
        store.dispatch(removeOfflineUser(id));
      });
    
      socketClient.socket.on("new-message", (data) => {
        store.dispatch(setNewMessage(data.message, data.sender));
      });
    });
    
    /* Error Handling */
    socketClient.socket.on('connect_error', (err) => {
      console.error(`connect_error due to ${err.message}`);
      socketClient.socket.disconnect();
    });
    
    socketClient.socket.on("connect_failed", (err) => {
      console.error(`connect_failed due to ${err.message}`);
      socketClient.socket.disconnect();
    });

    socketClient.socket.on("disconnect", (err) => {
      console.error(`disconnect due to ${err.message}`);
      socketClient.socket.disconnect();
    });
  }
}

export default initSocket;
