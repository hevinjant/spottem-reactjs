import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import SongItem from "./SongItem";
import "../styles/SongList.css";

const dummyData = [
  {
    user_dp: "https://i.scdn.co/image/ab6775700000ee85666a854c44b9ea5d7442f38e",
    email: "limassnursalim@gmail-com",
    song_name: "Personal Jesus - 2006 Remaster",
    artist: "Depeche Mode",
    song_image_url:
      "https://i.scdn.co/image/ab67616d0000b273e5158bfb0005da06d5d7c0eb",
  },
  {
    user_dp: "https://i.scdn.co/image/ab6775700000ee85e8c62fe34608b4a6b345b20a",
    email: "travisphawley@gmail-com",
    song_name: "Born To Die",
    artist: "Lana Del Rey",
    song_image_url:
      "https://i.scdn.co/image/ab67616d0000b273cb76604d9c5963544cf5be64",
  },
  {
    user_dp: "https://i.scdn.co/image/ab6775700000ee85fc1641f5db17cb2b18c5b488",
    email: "nguyenaiden321@gmail-com",
    song_name: "Personal Jesus - 2006 Remaster",
    artist: "When You Sleep",
    song_image_url:
      "https://i.scdn.co/image/ab67616d0000b2730ede770070357575bc050511",
  },
];

function SongList() {
  const [currentSongs, setCurrentSongs] = useState([]);

  useEffect(() => {
    setCurrentSongs(dummyData);
    /*
    fetchAllCurrentSongs().then((result) => {
      if (result) {
        const songs = result.map((friend) => {
          return friend["current_track"];
        });
        console.log("SONGS", songs);
        setCurrentSongs(songs);
      }
    });*/
  }, []);
  /*
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
*/
  return (
    <div className="song-list">
      <div className="song-list-container">
        {currentSongs.map((song, key) => {
          return <SongItem key={key} song={song} />;
        })}
      </div>
    </div>
  );
}

export default SongList;
