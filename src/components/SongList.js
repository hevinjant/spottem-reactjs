import React from "react";
import SongItem from "./SongItem";
import "../styles/SongList.css";

function SongList({ friends }) {
  return (
    <div className="song-list">
      <div className="song-list-container">
        {friends.map((friend, key) => {
          return <SongItem key={key} friend={friend} />;
        })}
      </div>
    </div>
  );
}

export default SongList;
