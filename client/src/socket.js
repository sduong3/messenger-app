import io from "socket.io-client";
import store from "./store";
import {
  setNewMessage,
  removeOfflineUser,
  addOnlineUser,
} from "./store/conversations";

const socket = io(window.location.origin, {
  withCredentials: true
});

socket.on("connect", () => {
  console.log("Connected to server");

  socket.on("add-online-user", (id) => {
    store.dispatch(addOnlineUser(id));
  });

  socket.on("remove-offline-user", (id) => {
    store.dispatch(removeOfflineUser(id));
  });

  socket.on("new-message", (data) => {
    store.dispatch(setNewMessage(data.message, data.sender));
  });
});

/* Error Handling */
socket.on('connect_error', (err) => {
  console.error(`connect_error due to ${err.message}`);
  socket.disconnect();
});

socket.on("connect_failed", (err) => {
  console.error(`connect_failed due to ${err.message}`);
  socket.disconnect();
});

socket.on("disconnect", (err) => {
  console.error(`disconnect due to ${err.message}`);
  socket.disconnect();
});

export default socket;
