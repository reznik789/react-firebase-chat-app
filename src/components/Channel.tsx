import React from "react";
import { RouteComponentProps } from "@reach/router";
import Members from "./Members";
import ChannelInfo from "./ChannelInfo";
import Messages from "./Messages";
import ChatInputBox from "./ChatInputBox";
import { User } from "../interfaces";

interface ChannelProps extends RouteComponentProps<{ channelId: string }> {
  user: User;
}

const Channel: React.FC<ChannelProps> = ({ user, channelId }) => {
  return (
    <div className="Channel">
      <div className="ChannelMain">
        <ChannelInfo channelId={channelId} />
        <Messages channelId={channelId} />
        <ChatInputBox user={user} channelId={channelId} />
      </div>
      <Members />
    </div>
  );
};

export default Channel;
