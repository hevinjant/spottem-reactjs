import React from "react";
import "../styles/FriendItem.css";

function FriendItem({ friend }) {
  return (
    <div className="friend-item">
      <div className="user-info">
        <img className="userdp" src={friend.user_dp} alt="no image" />
        <text className="name">{friend.name}</text>
      </div>
    </div>
  );
}

export default FriendItem;
