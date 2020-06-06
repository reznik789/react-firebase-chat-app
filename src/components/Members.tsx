import React, { useState, useEffect, useMemo } from "react";
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
    let members: User[] = [];
    return db
      .collection("users")
      .where(`channels.${channelId}`, "==", true)
      .onSnapshot(docs => {
        docs.forEach(doc => {
          members.push({
            ...((doc.data() as unknown) as User)
          });
        });
        setMembers(members);
      });
  }, [channelId]);

  const sortedMembers = useMemo(() => members.sort(sortByName), [members]);

  return (
    <div className="Members">
      <div>
        {sortedMembers.map(member => (
          <div key={member.uid} className="Member">
            <div className="MemberStatus online" />
            {member.displayName}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Members;
