import React from "react";
import "../styles/ReactionItem.css";
import SongElements from "./SongElements";

function ReactionItem({ reaction }) {
  function ReactionDirection({ reaction }) {
    if (reaction.sender_email === "hevin-jant@gmail-com") {
      return (
        <div className="reaction-info">
          <text>You liked {reaction.name}'s song</text>
          <div className="song-info">
            <SongElements
              song_image_url={reaction.song_image_url}
              song_name={reaction.song_name}
              artist={reaction.artist}
            />
          </div>
        </div>
      );
    } else {
      return (
        <div className="reaction-info">
          <text>{reaction.sender_name} liked your song</text>
          <SongElements
            song_image_url={reaction.song_image_url}
            song_name={reaction.song_name}
            artist={reaction.artist}
          />
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
