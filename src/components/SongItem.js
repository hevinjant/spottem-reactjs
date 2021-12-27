import React, { useState, useEffect } from "react";
import SongElements from "./SongElements";
import { backendEndpoint } from "../Data";
import convertEmail from "../util.js";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DefaultPic from "../assets/defaultPic.png";
import axios from "axios";
import "../styles/SongItem.css";

function SongItem({ friend }) {
  const [isLiked, setIsLiked] = useState(false);
  const userEmail = convertEmail(localStorage.getItem("user_email"));
  const currentSong = friend.current_track;
  const reactionsRequestUrl =
    "http://localhost:8080/" +
    backendEndpoint +
    "/reactions/" +
    userEmail +
    "/" +
    currentSong.song_id;

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
      const reaction = {
        email: currentSong.email,
        sender_email: userEmail,
        song_id: currentSong.song_id,
        song_name: currentSong.song_name,
        song_artists: currentSong.artist,
        song_album: currentSong.album,
        song_url: currentSong.song_url,
        song_image_url: currentSong.song_image_url,
        time_stamp: "",
      };
      const response = await axios.post(reactionsRequestUrl, reaction);
      return response;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async function removeReactionFromDatabase() {
    try {
      const response = await axios.delete(reactionsRequestUrl);
      return response;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async function checkLike() {
    try {
      const response = await axios.get(reactionsRequestUrl);
      return response;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  return (
    <div className="song-item">
      <div className="user-info">
        <img
          className="userdp"
          src={friend.user_dp}
          onError={() => (this.img.src = "../assets/defaultPic.png")}
          alt="display picture"
        />
        <text className="name">
          <strong>{friend.name}</strong> listens to
        </text>
      </div>
      <SongElements
        song_image_url={currentSong.song_image_url}
        song_name={currentSong.song_name}
        artist={currentSong.artist}
      />
      {isLiked ? (
        <button onClick={handleUnlike}>
          <FavoriteIcon />
        </button>
      ) : (
        <button onClick={handleLike}>
          <FavoriteBorderIcon />
        </button>
      )}
    </div>
  );
}

export default SongItem;
