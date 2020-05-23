import React from "react";
import formatDate from "date-fns/format";
import isSameDay from "date-fns/isSameDay";
import useCollection from "../hooks/useCollection";
import { Message } from "../interfaces";
import useDocument from "../hooks/useDocumentWithCache";
import { User } from "../interfaces";
import Scroller from "./Scroller";

interface MessagesProps {
  channelId?: string;
}

function shouldShowAvatar(prev: Message | undefined, curr: Message): boolean {
  return (
    !prev ||
    prev.user.id !== curr.user.id || //message from other user
    curr.createdAt.seconds - prev.createdAt.seconds > 3 * 60 // took some time before messages
  );
}

function shouldShowDay(prev: Message | undefined, curr: Message): boolean {
  return (
    !prev ||
    !isSameDay(prev.createdAt.seconds * 1000, curr.createdAt.seconds * 1000)
  );
}

const Messages: React.FC<MessagesProps> = ({ channelId }) => {
  const messages = useCollection<Message>(
    `chanels/${channelId}/messages`,
    "createdAt"
  );

  return (
    <Scroller className="Messages">
      <div className="EndOfMessages">That's every message!</div>
      {messages.map((message, i, allMes) => {
        const prevMes = allMes[i - 1];
        const showDay = shouldShowDay(prevMes, message);
        const isDiffUser: boolean = shouldShowAvatar(prevMes, message);

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
    </Scroller>
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
          <div className="DayText">
            {formatDate(message.createdAt.seconds * 1000, "dd/MM/yyyy")}
          </div>
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
            <span className="UserName">{author?.displayName}</span>{" "}
            <span className="TimeStamp">
              {formatDate(message.createdAt.seconds * 1000, "HH:mm")}
            </span>
          </div>
          <div className="MessageContent">{message.text}</div>
        </div>
      </div>
    </div>
  );
};

export default Messages;
