import React, { useState, useEffect } from 'react';
import {
  Box,
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
    boxShadow: "0 2px 10px 0 rgba(88,133,196,0.05)",
    marginBottom: 10,
    display: "flex",
    alignItems: "center",
    "&:hover": {
      cursor: "grab",
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

const Chat = (props) => {
  const [ unreadMessagesCount, setUnreadMessagesCount ] = useState(0);
  const [ convoWithUsername, setConvoWithUsername ] = useState('');
  const otherUser = props.conversation.otherUser;
  const classes = useStyles();

  useEffect(() => {
    if (props.conversation.otherUser.username !== convoWithUsername) {
      // set the right notification counter here
      console.log(props.conversation.unreadMessagesCount);
      return setUnreadMessagesCount(props.conversation.unreadMessagesCount);
    }
    setUnreadMessagesCount(0);
  }, [props.conversation.unreadMessagesCount]);

  const handleClick = async (conversation) => {
    setConvoWithUsername(conversation.otherUser.username);
    await props.setActiveChat(conversation.otherUser.username);
    await axios.patch("/api/messages/read", {
      conversationId: conversation.id,
      otherUserId: conversation.otherUser.id
    });
    setUnreadMessagesCount(0);
  };
  
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
      <ChatContent 
        conversation={props.conversation} 
        unreadMessagesCount={unreadMessagesCount}/>

      {unreadMessagesCount > 0 &&
        <Typography className={classes.notification}>
          {unreadMessagesCount}
        </Typography>
      }
    </Box>
  );
}


const mapDispatchToProps = (dispatch) => {
  return {
    setActiveChat: (id) => {
      dispatch(setActiveChat(id));
    },
  };
};

export default connect(null, mapDispatchToProps)(Chat);
