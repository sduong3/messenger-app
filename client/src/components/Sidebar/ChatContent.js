import React from "react";
import { Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "space-between",
    marginLeft: 20,
    flexGrow: 1,
  },
  username: {
    fontWeight: "bold",
    letterSpacing: -0.2,
  },
  readText: {
    color: "#9CADC8",
    letterSpacing: -0.17,
  },
  unreadText: {
    color: "black",
    fontWeight: "bold",
    letterSpacing: -0.17,
  },
}));

const ChatContent = ({ conversation, unreadMessagesCount }) => {
  const classes = useStyles();
  const { latestMessageText, otherUser } = conversation;


  return (
    <Box className={classes.root}>
      <Box>
        <Typography className={classes.username}>
          {otherUser.username}
        </Typography>
        <Typography className={ 
          unreadMessagesCount > 0 ? classes.unreadText : classes.readText
          }>
          {latestMessageText}
        </Typography>
      </Box>
    </Box>
  );
};

export default ChatContent;
