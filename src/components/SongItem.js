import React from "react";
import "../styles/SongItem.css";
import SongElements from "./SongElements";
import DefaultPic from "../assets/defaultPic.png";

function SongItem({ friend }) {
  return (
    <div className="song-item">
      <div className="user-info">
        <img className="userdp" src={friend.user_dp} alt="no img" />
        <text className="name">{friend.name} listens to</text>
      </div>
      <SongElements
        song_image_url={friend.current_track.song_image_url}
        song_name={friend.current_track.song_name}
        artist={friend.current_track.artist}
      />
    </div>
  );
}

export default SongItem;
