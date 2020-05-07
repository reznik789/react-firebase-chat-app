import React, { useState, useCallback } from "react";
import { db } from "../firebase";

const ChatInputBox: React.FC = (props) => {
  const [message, setMessage] = useState<string>("");

  const onChange = useCallback((event) => {
    setMessage(event.target.value);
  }, []);

  const onSubmit = useCallback(
    (event) => {
      event.preventDefault();
      db.collection("chanels").doc("general").collection("messages").add({
        text: message,
        createdAt: new Date(),
      }).then(res => {
        console.log(res);
        setMessage('');        
      }).catch(err => {
        console.log(err);        
      });
    },
    [message]
  );

  return (
    <form className="ChatInputBox" onSubmit={onSubmit}>
      <input
        className="ChatInput"
        placeholder="Message #general"
        value={message}
        onChange={onChange}
      />
    </form>
  );
};

export default ChatInputBox;
