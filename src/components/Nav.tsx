import React from "react";
import useCollection from "../hooks/useCollection";

interface Channel {
  id: string;
  topic: string;
}

const Nav = () => {
  const channels = useCollection<Channel>('chanels');

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
          <a key={channel.id} href={`/channel/${channel.id}`} >
            # {channel.id}
          </a>
        ))}
      </nav>
    </div>
  );
};

export default Nav;
