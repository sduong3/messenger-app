import React from "react";
import { Box } from "@material-ui/core";
import { SenderBubble, OtherUserBubble } from "../ActiveChat";
import moment from "moment";

const Messages = ({ messages, otherUser, userId, lastMessageSeen } ) => {
  return (
    <Box>
      {messages.map((message) => {
        const time = moment(message.createdAt).format("h:mm");
        console.log(message);
        
        return message.senderId === userId ? 
          <SenderBubble key={message.id} messageId ={message.id} text={message.text} time={time} lastMessageSeen={lastMessageSeen} otherUser={otherUser} />
          : 
          <OtherUserBubble key={message.id} text={message.text} time={time} otherUser={otherUser} />
        ;
      })}
      
    </Box>
  );
};

export default Messages;
