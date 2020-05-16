import React, { useCallback, SyntheticEvent, useRef } from "react";
import useDoc from "../hooks/useDoc";
import { Channel } from "../interfaces";
import { db } from "../firebase";

interface ChannelInfoProps {
  channelId?: string;
}

const ChannelInfo: React.FC<ChannelInfoProps> = ({ channelId }) => {
  const channel = useDoc<Channel>(`chanels/${channelId}`);

  const topicInput = useRef<HTMLInputElement>(null);

  const onTopicUpdate = useCallback((e: SyntheticEvent) => {
    e.preventDefault();
    if (!topicInput.current?.value || !channel) return;
    const newChannel: Channel = {
      ...channel,
      topic: topicInput.current.value,
    };
    db.doc(`chanels/${channelId}`).set(newChannel);
  }, [channelId, channel]);

  return (
    <div className="ChannelInfo">
      <form onSubmit={onTopicUpdate} className="Topic">
        Topic:{" "}
        <input
          className="TopicInput"
          defaultValue={channel?.topic}
          ref={topicInput}
        />
      </form>
      <div className="ChannelName">#{channelId}</div>
    </div>
  );
};

export default ChannelInfo;
