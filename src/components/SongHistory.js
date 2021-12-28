import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { backendEndpoint } from "../Data";
import SongElements from "./SongElements";
import convertEmail from "../util.js";
import "../styles/SongHistory.css";

function SongHistory() {
  const [songHistory, setSongHistory] = useState([]);
  const userEmail = convertEmail(localStorage.getItem("user_email"));
  const endpoint = `${backendEndpoint}/user/${userEmail}`;

  useEffect(() => {
    fetchSongHistory().then((result) => {
      if (result) {
        const reversedResult = result.reverse();
        setSongHistory(reversedResult);
      }
    });
  });

  async function fetchSongHistory() {
    try {
      const response = await axios.get(endpoint);
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
          return <SongElements key={key} song={song} />;
        })}
      </div>
    </div>
  );
}

export default SongHistory;
