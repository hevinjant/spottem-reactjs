import React from "react";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import defaultDp from "../assets/defaultPic2.jpeg";
import "../styles/FriendItem.css";

function FriendItem({ friend, handleRemoveFriend }) {
  function handleRemove() {
    handleRemoveFriend(friend.email);
  }

  return (
    <div className="friend-item">
      <div className="user-info">
        {friend.user_dp ? (
          <img className="userdp" src={friend.user_dp} alt="no image" />
        ) : (
          <img className="userdp" src={defaultDp} alt="no image" />
        )}
        <text className="name">{friend.name}</text>
      </div>
      <button className="remove-friend" onClick={handleRemove}>
        <HighlightOffIcon />
      </button>
    </div>
  );
}

export default FriendItem;
