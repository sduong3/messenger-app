import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Typography, Avatar } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end"
  },
  seenAvatar: {
    height: 20,
    width: 20,
    marginRight: 11,
    marginTop: 6
  },
  date: {
    fontSize: 11,
    color: "#BECCE2",
    fontWeight: "bold",
    marginBottom: 5
  },
  text: {
    fontSize: 14,
    color: "#91A3C0",
    letterSpacing: -0.2,
    padding: 8,
    fontWeight: "bold"
  },
  bubble: {
    background: "#F4F6FA",
    borderRadius: "10px 10px 0 10px"
  }
}));

const SenderBubble = ({ messageId, time, text, lastMessageSeen, otherUser }) => {
  const classes = useStyles();

  const isLastRead = lastMessageSeen 
    && (lastMessageSeen.id === messageId) 
    && (lastMessageSeen.text === text);

  return (
    <Box className={classes.root}>
      <Typography className={classes.date}>{time}</Typography>
      <Box className={classes.bubble}>
        <Typography className={classes.text}>{text}</Typography>
      </Box>
      {isLastRead && 
      <Avatar alt={otherUser.username} src={otherUser.photoUrl} className={classes.seenAvatar} ></Avatar>}

    </Box>
  );
};

export default SenderBubble;
