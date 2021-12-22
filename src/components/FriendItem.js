import React from "react";
import "../styles/FriendItem.css";

function FriendItem({ friend }) {
  return (
    <div className="friend-item">
      <div className="user-info">
        <img className="userdp" src={friend.user_dp} alt="no image" />
        <p className="name">{friend.name}</p>
      </div>
    </div>
  );
}

export default FriendItem;
