import React, { useEffect, useState } from "react";
import { db } from "../firebase";

interface Channel {
  id: string;
  topic: string;
}

const Nav = () => {
  const [channels, setChannels] = useState<Channel[]>([]);

  useEffect(() => {
    return db.collection("chanels").onSnapshot((snapshot) => {
      const channels: Channel[] = [];
      snapshot.forEach((doc) => {
        channels.push({
          ...(doc.data() as Channel),
          id: doc.id,
        });
      });
      setChannels(channels);
    });
  }, []);

  return (
    <div className="Nav">
      <div className="User">
        <img
          className="UserImage"
          alt="whatever"
          src="https://placekitten.com/64/64"
        />
        <div>
          <div>Ryan Peterson Florence</div>
          <div>
            <button className="text-button">log out</button>
          </div>
        </div>
      </div>
      <nav className="ChannelNav">
        {channels.map((channel) => (
          <a href={`/channel/${channel.id}`}># {channel.id}</a>
        ))}
      </nav>
    </div>
  );
};

export default Nav;
