import React, { useState, useEffect } from 'react';
import {
  Box,
  FormHelperText,
  ThemeProvider,
  Typography,
} from '@material-ui/core';
import { BadgeAvatar, ChatContent } from '../Sidebar';
import { makeStyles } from '@material-ui/core/styles';
import { setActiveChat } from '../../store/activeConversation';
import { connect } from 'react-redux';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: 8,
    height: 80,
    boxShadow: '0 2px 10px 0 rgba(88,133,196,0.05)',
    marginBottom: 10,
    display: 'flex',
    alignItems: 'center',
    '&:hover': {
      cursor: 'grab',
    },
  },
  // TODO: polish up later
  notification: {
    height: '25px',
    width: '25px',
    backgroundColor: theme.palette.primary.main,
    color: 'white',
    borderRadius: 10,
    fontSize: 10,
    fontWeight: 'bold',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '0.5rem',
  },
}));

//TODO: organize these elements using grids
const Chat = ({ setActiveChat, conversation }) => {
  const [activeChatWithUser, setActiveChatWithUser] = useState('');
  const [unreadMessagesCount, setUnreadMessagesCount] = useState(0);
  const classes = useStyles();

  const handleClick = async (clickedConversation) => {
    setActiveChatWithUser(conversation.otherUser.username);
    await setActiveChat(clickedConversation.otherUser.username);

    await axios.patch('/api/messages/read', {
      otherUserId: clickedConversation.otherUser.id,
      conversationId: clickedConversation.id,
    });
  };

  const otherUser = conversation.otherUser;

  useEffect(() => {
    if (conversation.otherUser.username !== activeChatWithUser) {
      return setUnreadMessagesCount(conversation.unreadMessagesCount);
    }
    setUnreadMessagesCount(0);
  }, [conversation.unreadMessagesCount]);

  return (
    <Box onClick={() => handleClick(conversation)} className={classes.root}>
      <BadgeAvatar
        photoUrl={otherUser.photoUrl}
        username={otherUser.username}
        online={otherUser.online}
        sidebar={true}
      />
      <ChatContent
        conversation={conversation}
        unreadMessagesCount={unreadMessagesCount}
      />

      <Typography className={classes.notification}>
        {unreadMessagesCount}
      </Typography>
    </Box>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    setActiveChat: (id) => {
      dispatch(setActiveChat(id));
    },
  };
};

export default connect(null, mapDispatchToProps)(Chat);
