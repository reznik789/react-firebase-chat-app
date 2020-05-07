import React from "react";
import useCollection from "../hooks/useCollection";

interface Message {
  id: string;
  text: string;
  createdAt: {
    seconds: number;
    nanoseconds: number;
  };
}

const Messages: React.FC = () => {
  const messages = useCollection<Message>('chanels/general/messages', 'createdAt');
  console.log(messages);
  

  return (
    <div className="Messages">
      <div className="EndOfMessages">That's every message!</div>
      {messages.map((message, i) => {
        return i === 0 ? (
          <div key={message.id}>
            <div className="Day">
              <div className="DayLine" />
              <div className="DayText">12/6/2018</div>
              <div className="DayLine" />
            </div>
            <div className="Message with-avatar">
              <div className="Avatar" />
              <div className="Author">
                <div>
                  <span className="UserName">Ryan Florence </span>
                  <span className="TimeStamp">3:37 PM</span>
                </div>
                <div className="MessageContent">{message.text}</div>
              </div>
            </div>
          </div>
        ) : (
          <div key={message.id}>
            <div className="Message no-avatar">
              <div className="MessageContent">{message.text}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Messages;
