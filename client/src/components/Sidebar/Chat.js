import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
} from '@material-ui/core';
import { BadgeAvatar, ChatContent } from '../Sidebar';
import { makeStyles } from '@material-ui/core/styles';
import { setActiveChat } from '../../store/activeConversation';
import { connect } from 'react-redux';
import { markAsRead } from '../../store/utils/thunkCreators';

const useStyles = makeStyles(() => ({
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
  smallNotification: {
    height: 20,
    width: 20,
    backgroundColor: "#3F92FF",
    marginRight: 10,
    color: "white",
    fontSize: 10,
    letterSpacing: -0.5,
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  wideNotification: {
    height: 20,
    width: 30,
    backgroundColor: "#3F92FF",
    marginRight: 10,
    color: "white",
    fontSize: 10,
    letterSpacing: -0.5,
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
}));

const Chat = (props) => {
  const classes = useStyles();
  const [ unreadMessagesCount, setUnreadMessagesCount ] = useState(0);
  const otherUser = props.conversation.otherUser;

  const { conversation } = props;
  const isActiveConvo = props.activeConversation !== conversation.otherUser.username;

  useEffect(() => {
    setUnreadMessagesCount(conversation.unreadMessagesCount);
  }, [conversation]);


  const handleClick = async () => {
    await props.setActiveChat(conversation.otherUser.username);
    await props.markAsRead(conversation);
    setUnreadMessagesCount(0);
  };
  
  return (
    <Box
      onClick={handleClick}
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
        isActiveConvo={isActiveConvo}
        unreadMessagesCount={unreadMessagesCount}/>

      {isActiveConvo && 
      unreadMessagesCount > 0 && 
        <Typography className={
          unreadMessagesCount > 9 ? classes.wideNotification : classes.smallNotification}>
          {unreadMessagesCount}
        </Typography>
      }
    </Box>
  );
}

const mapStateToProps = (state) => {
  return {
    activeConversation: state.activeConversation
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setActiveChat: (id) => {
      dispatch(setActiveChat(id));
    },
    markAsRead: (conversation) => {
      dispatch(markAsRead(conversation));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
