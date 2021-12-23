import React from "react";
import "../styles/SongItem.css";

function SongItem({ friend }) {
  return (
    <div className="song-item">
      <div className="user-info">
        <img className="userdp" src={friend.user_dp} alt="no image" />
        <text className="name">{friend.name} listens to</text>
      </div>
      <img src={friend.current_track.song_image_url} alt="no image" />
      <text className="song-name">{friend.current_track.song_name}</text>
      <text className="artist">by {friend.current_track.artist}</text>
    </div>
  );
}

export default SongItem;
