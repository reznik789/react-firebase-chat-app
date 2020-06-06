import React, { useEffect } from "react";
import { RouteComponentProps } from "@reach/router";
import Members from "./Members";
import ChannelInfo from "./ChannelInfo";
import Messages from "./Messages";
import ChatInputBox from "./ChatInputBox";
import { User } from "../interfaces";
import { db } from "../firebase";

interface ChannelProps extends RouteComponentProps<{ channelId: string }> {
  user: User;
}

const Channel: React.FC<ChannelProps> = ({ user, channelId }) => {
  useEffect(() => {
    db.doc(`users/${user.uid}`).update({
      [`channels.${channelId}`]: true
    });
  }, [user.uid, channelId]);

  return (
    <div className="Channel">
      <div className="ChannelMain">
        <ChannelInfo channelId={channelId} />
        <Messages channelId={channelId} />
        <ChatInputBox user={user} channelId={channelId} />
      </div>
      <Members channelId={channelId} />
    </div>
  );
};

export default Channel;
