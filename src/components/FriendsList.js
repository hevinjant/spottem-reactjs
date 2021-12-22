import React from "react";
import FriendItem from "./FriendItem";
import "../styles/FriendsList.css";

function FriendsList({ friends }) {
  return (
    <div className="friends-list">
      <text>Friends</text>
      <div className="friends-list-container">
        {friends.map((friend, key) => {
          return <FriendItem key={key} friend={friend} />;
        })}
      </div>
    </div>
  );
}

export default FriendsList;
