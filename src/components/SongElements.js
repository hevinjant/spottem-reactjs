import React from "react";

function SongElements({ song_image_url, song_name, artist }) {
  return (
    <div className="song-elements">
      <img src={song_image_url} alt="no image" />
      <text className="name">{song_name}</text>
      <text className="artist">{artist}</text>
    </div>
  );
}

export default SongElements;
