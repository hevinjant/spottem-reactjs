import React from "react";
import SongPreview from "./SongPreview";
import "../styles/SongElements.css";

function SongElements({ song }) {
  return (
    <div className="song-elements">
      <img src={song.song_image_url} alt="no image" />
      <text className="name">{song.song_name}</text>
      <text className="artist">{song.artist}</text>
      <text className="artist">{song.song_artists}</text>
      <div className="song-preview-container">
        <SongPreview previewUrl={song.preview_url} />
      </div>
    </div>
  );
}

export default SongElements;
