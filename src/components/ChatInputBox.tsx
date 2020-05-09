import React, { useState, useCallback } from "react";
import firebase, { db } from "../firebase";
import { User } from "../interfaces";

interface ChatInputBoxProps {
  user: User
}

const ChatInputBox: React.FC<ChatInputBoxProps> = ({user}) => {
  const [message, setMessage] = useState<string>("");

  const onChange = useCallback((event) => {
    setMessage(event.target.value);
  }, []);

  const onSubmit = useCallback(
    (event) => {
      event.preventDefault();
      db.collection("chanels").doc("general").collection("messages").add({
        user: db.collection('users').doc(user.uid),
        text: message,
        createdAt: new Date(),
      }).then((res: firebase.firestore.DocumentData) => {
        console.log(res);
        setMessage('');        
      }).catch((err: firebase.firestore.FirestoreError) => {
        console.log(err);        
      });
    },
    [message, user.uid]
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
