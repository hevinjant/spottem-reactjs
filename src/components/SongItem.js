import React from "react";
import "../styles/SongItem.css";

function SongItem({ song }) {
  return (
    <div className="song-item">
      <div className="user-info">
        <img className="userdp" src={song.user_dp} alt="no image" />
        <p className="email">{song.email} listens to</p>
      </div>
      <img src={song.song_image_url} alt="no image" />
      <p className="name">{song.song_name}</p>
      <p className="artist">by {song.artist}</p>
    </div>
  );
}

export default SongItem;
