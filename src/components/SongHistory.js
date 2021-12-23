import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { backendEndpoint } from "../Data";
import SongElements from "./SongElements";
import "../styles/SongHistory.css";

function SongHistory() {
  const [songHistory, setSongHistory] = useState([]);

  useEffect(() => {
    fetchSongHistory().then((result) => {
      if (result) {
        setSongHistory(result);
      }
    });
  });

  async function fetchSongHistory() {
    try {
      const response = await axios.get(
        "http://localhost:8080/" +
          backendEndpoint +
          "/user/hevin-jant@gmail-com"
      );
      return response.data["user"]["song_history"];
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  return (
    <div className="song-history">
      <div className="song-history-list">
        {songHistory.map((song, key) => {
          return (
            <SongElements
              key={key}
              song_image_url={song.song_image_url}
              song_name={song.song_name}
              artist={song.artist}
            />
          );
        })}
      </div>
    </div>
  );
}

export default SongHistory;
