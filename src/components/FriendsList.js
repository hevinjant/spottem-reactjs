import React from "react";
import FriendItem from "./FriendItem";
import AddFriend from "./AddFriend";
import "../styles/FriendsList.css";

function FriendsList({ friends, handleAddFriend, handleRemoveFriend }) {
  return (
    <div className="friends-list">
      <text>Friends</text>
      <AddFriend handleAddFriend={handleAddFriend} />
      <div className="friends-list-container">
        {friends.map((friend, key) => {
          return (
            <FriendItem
              key={key}
              friend={friend}
              handleRemoveFriend={handleRemoveFriend}
            />
          );
        })}
      </div>
    </div>
  );
}

export default FriendsList;
