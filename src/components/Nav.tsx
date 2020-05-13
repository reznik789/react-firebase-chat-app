import React, { useCallback } from "react";
import { Link } from '@reach/router';
import useCollection from "../hooks/useCollection";
import { User } from "../interfaces";
import firebase from "../firebase";

interface Channel {
  id: string;
  topic: string;
}

interface NavProps {
  user: User;
}

const Nav: React.FC<NavProps> = ({ user }) => {
  const channels = useCollection<Channel>("chanels");

  const onLogOut = useCallback(() => {
    firebase.auth().signOut();
  }, []);

  return (
    <div className="Nav">
      <div className="User">
        <img className="UserImage" alt="whatever" src={user.photoUrl} />
        <div>
          <div>{user.displayName}</div>
          <div>
            <button className="text-button" onClick={onLogOut}>
              log out
            </button>
          </div>
        </div>
      </div>
      <nav className="ChannelNav">
        {channels.map((channel) => (
          <Link key={channel.id} to={`/channel/${channel.id}`} >
            # {channel.id}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Nav;
