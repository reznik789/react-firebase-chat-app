import React from "react";
import Members from "./Members";
import ChannelInfo from "./ChannelInfo";
import Messages from "./Messages";
import ChatInputBox from "./ChatInputBox";
import { User } from '../interfaces';

interface ChannelProps {
  user: User
}

const Channel: React.FC<ChannelProps> = ({user}) => {
  return (
    <div className="Channel">
      <div className="ChannelMain">
        <ChannelInfo />
        <Messages />
        <ChatInputBox user={user} />
      </div>
      <Members />
    </div>
  );
};

export default Channel;
