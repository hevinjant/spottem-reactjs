import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import SongItem from "./SongItem";

function SongList() {
  const [currentSongs, setCurrentSongs] = useState([]);

  useEffect(() => {
    fetchAllCurrentSongs().then((result) => {
      if (result) {
        const songs = result.map((friend) => {
          return friend["current_track"];
        });
        console.log("SONGS", songs);
        setCurrentSongs(songs);
      }
    });
  }, []);

  async function fetchAllCurrentSongs() {
    try {
      const response = await axios.get(
        "http://localhost:8080/http://10.20.5.89:5001/user/friends/hevin-jant@gmail-com"
      );
      console.log("RESPONSE:", response);
      return response.data["friends"];
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  return (
    <div className="song-list">
      {currentSongs.map((song, key) => {
        return <SongItem key={key} song={song} />;
      })}
    </div>
  );
}

export default SongList;
