import React from "react";
import SongElements from "./SongElements";
import "../styles/ReactionItem.css";
import convertEmail from "../util";

function ReactionItem({ reaction }) {
  const userEmail = convertEmail(localStorage.getItem("user_email"));

  function ReactionDirection({ reaction }) {
    if (reaction.sender_email === userEmail) {
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
