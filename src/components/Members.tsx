import React, { useState, useEffect } from "react";
import { RouteComponentProps } from "@reach/router";
import { User } from "../interfaces";
import { db } from "../firebase";

const sortByName = (a: User, b: User): number => {
  if (a.displayName > b.displayName) return 1;
  if (a.displayName < b.displayName) return -1;
  return 0;
};

const Members: React.FC<RouteComponentProps<{ channelId: string }>> = ({
  channelId
}) => {
  const [members, setMembers] = useState<User[]>([]);

  useEffect(() => {
    return db
      .collection("users")
      .where(`channels.${channelId}`, "==", true)
      .onSnapshot(docs => {
        let members: User[] = [];
        docs.forEach(doc => {
          members.push(
            (doc.data() as unknown) as User
          );
        });
        members.sort(sortByName)
        setMembers(members);
      });
  }, [channelId]);

  return (
    <div className="Members">
      <div>
        {members.map(member => (
          <div key={member.uid} className="Member">
            <div className={`MemberStatus ${member.status?.state || 'offline'}`} />
            {member.displayName}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Members;
