import React from "react";
import "../styles/ReactionItem.css";

function ReactionItem({ reaction }) {
  function ReactionDirection({ reaction }) {
    if (reaction.sender_email === "hevin-jant@gmail-com") {
      return (
        <div className="reaction-info">
          <text>You liked {reaction.name}'s song</text>
          <div className="song-info">
            <img src={reaction.song_image_url} alt="no image" />
            <text className="name">{reaction.song_name}</text>
            <text className="artist">{reaction.artist}</text>
          </div>
        </div>
      );
    } else {
      return (
        <div className="reaction-info">
          <text>{reaction.sender_name} liked your song</text>
          <div className="song-info">
            <img src={reaction.song_image_url} alt="no image" />
            <text className="name">{reaction.song_name}</text>
            <text className="artist">{reaction.artist}</text>
          </div>
        </div>
      );
    }
  }

  return (
    <div className="reaction-item">
      <ReactionDirection reaction={reaction} />
    </div>
  );
}

export default ReactionItem;
