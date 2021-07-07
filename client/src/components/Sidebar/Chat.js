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
const Chat = (props) => {
  const [activeChatId, setActiveChatId] = useState('');
  const [unreadMessagesCount, setUnreadMessagesCount] = useState(0);
  const classes = useStyles();

  const handleClick = async (clickedConversation) => {
    setActiveChatId(clickedConversation.otherUser.username);
    await props.setActiveChat(clickedConversation.otherUser.username);

    await axios.patch('/api/messages/read', {
      conversationId: clickedConversation.id,
      otherUserId: clickedConversation.otherUser.id,
    });
    setUnreadMessagesCount(0);
  };

  const otherUser = props.conversation.otherUser;

  useEffect(() => {
    // Only reset the unread notification count
    if (props.conversation.otherUser.username !== activeChatId) {
      return setUnreadMessagesCount(props.conversation.unreadMessagesCount);
    }
    setUnreadMessagesCount(0);
  }, [props.conversation.unreadMessagesCount]);

  return (
    <Box
      onClick={() => handleClick(props.conversation)}
      className={classes.root}
    >
      <BadgeAvatar
        photoUrl={otherUser.photoUrl}
        username={otherUser.username}
        online={otherUser.online}
        sidebar={true}
      />
      <ChatContent conversation={props.conversation} />
      {unreadMessagesCount > 0 && (
        <Typography className={classes.notification}>
          {unreadMessagesCount}
        </Typography>
      )}
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
