import React from "react";
import SongElements from "./SongElements";
import "../styles/ReactionItem.css";

function ReactionItem({ reaction }) {
  function ReactionDirection({ reaction }) {
    if (reaction.sender_email === "hevin-jant@gmail-com") {
      return (
        <div className="reaction-info">
          <text>
            You liked <strong>{reaction.name}</strong>'s song
          </text>
          <div className="song-info">
            <SongElements song={reaction} />
          </div>
        </div>
      );
    } else {
      return (
        <div className="reaction-info">
          <text>
            <strong>{reaction.sender_name}</strong> liked your song
          </text>
          <div className="song-info">
            <SongElements song={reaction} />
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
