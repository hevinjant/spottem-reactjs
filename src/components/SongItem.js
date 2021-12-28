import React, { useState, useEffect } from "react";
import SongElements from "./SongElements";
import { backendEndpoint } from "../Data";
import convertEmail from "../util.js";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import defaultDp from "../assets/defaultPic2.jpeg";
import axios from "axios";
import "../styles/SongItem.css";

function SongItem({ friend }) {
  const [isLiked, setIsLiked] = useState(false);
  const userEmail = convertEmail(localStorage.getItem("user_email"));
  const currentSong = friend.current_track;
  const endpoint = `${backendEndpoint}/reactions/${userEmail}/${currentSong.song_id}`;

  useEffect(() => {
    checkLike().then((result) => {
      if (result) {
        if (result.status === 200) {
          setIsLiked(true);
        }
      }
    });
  }, []);

  function handleLike() {
    insertReactionToDatabase();
    setIsLiked(true);
  }

  function handleUnlike() {
    removeReactionFromDatabase();
    setIsLiked(false);
  }

  async function insertReactionToDatabase() {
    try {
      const now = Date.now();
      const timestamp = new Date(now);

      const reaction = {
        email: currentSong.email,
        sender_email: userEmail,
        song_id: currentSong.song_id,
        song_name: currentSong.song_name,
        song_artists: currentSong.artist,
        song_album: currentSong.album,
        song_url: currentSong.song_url,
        song_image_url: currentSong.song_image_url,
        preview_url: currentSong.preview_url,
        time_stamp: timestamp.toString(),
      };
      const response = await axios.post(endpoint, reaction);
      return response;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async function removeReactionFromDatabase() {
    try {
      const response = await axios.delete(endpoint);
      return response;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async function checkLike() {
    try {
      const response = await axios.get(endpoint);
      return response;
    } catch (error) {
      console.log("Failed to fetch reaction: ", error);
      return false;
    }
  }

  return (
    <div className="song-item">
      <div className="user-info">
        {friend.user_dp ? (
          <img className="userdp" src={friend.user_dp} alt="no image" />
        ) : (
          <img className="userdp" src={defaultDp} alt="no image" />
        )}
        <text className="name">
          <strong>{friend.name}</strong> listens to
        </text>
      </div>
      <SongElements song={currentSong} />
      {isLiked ? (
        <button onClick={handleUnlike}>
          <FavoriteIcon fontSize="large" />
        </button>
      ) : (
        <button onClick={handleLike}>
          <FavoriteBorderIcon fontSize="large" />
        </button>
      )}
    </div>
  );
}

export default SongItem;
