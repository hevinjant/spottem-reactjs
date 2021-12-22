import React from "react";
import "../styles/SongItem.css";

function SongItem({ friend }) {
  return (
    <div className="song-item">
      <div className="user-info">
        <img className="userdp" src={friend.user_dp} alt="no image" />
        <p className="name">{friend.name} listens to</p>
      </div>
      <img src={friend.current_track.song_image_url} alt="no image" />
      <p className="song-name">{friend.current_track.song_name}</p>
      <p className="artist">by {friend.current_track.artist}</p>
    </div>
  );
}

export default SongItem;
