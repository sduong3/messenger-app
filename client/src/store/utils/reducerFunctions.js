export const addMessageToStore = (state, payload) => {
  const { message, sender } = payload;
  // if sender isn't null, that means the message needs to be put in a brand new convo
  if (sender !== null) {
    const newConvo = {
      id: message.conversationId,
      otherUser: sender,
      messages: [message],
    };
    newConvo.latestMessageText = message.text;
    return [newConvo, ...state];
  }

  return state.map((convo) => {
    if (convo.id === message.conversationId) {
      const convoCopy = { ...convo };
      convoCopy.messages.push(message);
      convoCopy.latestMessageText = message.text;
      convoCopy.unreadMessagesCount =  convo.unreadMessagesCount + 1;
      
      return convoCopy;
    } else {
      return convo;
    }
  });
};

export const addOnlineUserToStore = (state, id) => {
  return state.map((convo) => {
    if (convo.otherUser.id === id) {
      const convoCopy = { ...convo };
      convoCopy.otherUser.online = true;
      return convoCopy;
    } else {
      return convo;
    }
  });
};

export const removeOfflineUserFromStore = (state, id) => {
  return state.map((convo) => {
    if (convo.otherUser.id === id) {
      const convoCopy = { ...convo };
      convoCopy.otherUser.online = false;
      return convoCopy;
    } else {
      return convo;
    }
  });
};

export const addSearchedUsersToStore = (state, users) => {
  const currentUsers = {};

  // make table of current users so we can lookup faster
  state.forEach((convo) => {
    currentUsers[convo.otherUser.id] = true;
  });

  const newState = [...state];
  users.forEach((user) => {
    // only create a fake convo if we don't already have a convo with this user
    if (!currentUsers[user.id]) {
      let fakeConvo = { otherUser: user, messages: [] };
      newState.push(fakeConvo);
    }
  });

  return newState;
};

export const addNewConvoToStore = (state, recipientId, message) => {
  return state.map((convo) => {
    if (convo.otherUser.id === recipientId) {
      const newConvo = { ...convo };
      newConvo.id = message.conversationId;
      newConvo.messages.push(message);
      newConvo.latestMessageText = message.text;
      return newConvo;
    } else {
      return convo;
    }
  });
};



export const updateReadMessagesToStore = (state, payload) => {
  const { conversationId, otherUserId } = payload;

  return state.map((convo) => {
    if (convo.id === conversationId) {
      const convoCopy = { ...convo };

      // Update read messages by other user
      for (let i=convoCopy.messages.length-1; i >= 0; i--) {
        if (convoCopy.messages[i].senderId === otherUserId && convoCopy.messages[i].isRead) {
          break;
        }
        if (convoCopy.messages[i].senderId === otherUserId && !convoCopy.messages[i].isRead) {
          convoCopy.messages[i].isRead = true;
        }
      }
      
      // Update last message seen
      for (let i=convoCopy.messages.length-1; i >= 0; i--) {
        if (convoCopy.messages[i].senderId !== otherUserId && convoCopy.messages[i].isRead) {
          convoCopy.lastMessageSeen = convoCopy.messages[i];
          break;
        }
      }
      convoCopy.unreadMessagesCount = 0;
      return convoCopy;
    } else {
      return convo;
    }
  });
};