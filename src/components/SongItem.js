import React from "react";

function SongItem({ song }) {
  return (
    <div>
      <img src={song.song_image_url} alt="no image" />
      <p>{song.song_name}</p>
      <p>by {song.artist}</p>
    </div>
  );
}

export default SongItem;
