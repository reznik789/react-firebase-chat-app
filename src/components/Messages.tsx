import React from "react";
import useCollection from "../hooks/useCollection";
import { Message } from "../interfaces";
import useDocument from "../hooks/useDocument";
import { User } from "../interfaces";

const Messages: React.FC = () => {
  const messages = useCollection<Message>(
    "chanels/general/messages",
    "createdAt"
  );

  return (
    <div className="Messages">
      <div className="EndOfMessages">That's every message!</div>
      {messages.map((message, i, allMes) => {
        const prevMes = allMes[i - 1];
        const showDay = false;
        const isDiffUser: boolean =
          !prevMes || prevMes.user.id !== message.user.id;

        return isDiffUser ? (
          <MessageWithDetails
            key={message.id}
            message={message}
            showDay={showDay}
          />
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

const MessageWithDetails: React.FC<{ message: Message; showDay: boolean }> = ({
  message,
  showDay,
}) => {
  const author = useDocument<User>(message.user.path);

  return (
    <div>
      {showDay && (
        <div className="Day">
          <div className="DayLine" />
          <div className="DayText">12/6/2018</div>
          <div className="DayLine" />
        </div>
      )}
      <div className="Message with-avatar">
        <div
          className="Avatar"
          style={{
            backgroundImage: author ? `url("${author.photoUrl}")` : "none",
          }}
        />
        <div className="Author">
          <div>
            <span className="UserName">{author?.displayName} </span>
            <span className="TimeStamp">3:37 PM</span>
          </div>
          <div className="MessageContent">{message.text}</div>
        </div>
      </div>
    </div>
  );
};

export default Messages;
