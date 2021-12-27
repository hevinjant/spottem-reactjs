import React from "react";
import FriendItem from "./FriendItem";
import AddFriend from "./AddFriend";
import "../styles/FriendsList.css";

function FriendsList({ friends, handleFormSubmit }) {
  return (
    <div className="friends-list">
      <text>Friends</text>
      <AddFriend handleFormSubmit={handleFormSubmit} />
      <div className="friends-list-container">
        {friends.map((friend, key) => {
          return <FriendItem key={key} friend={friend} />;
        })}
      </div>
    </div>
  );
}

export default FriendsList;
