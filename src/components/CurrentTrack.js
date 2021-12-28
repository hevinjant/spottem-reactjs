import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import SongElements from "./SongElements";
import { backendEndpoint } from "../Data";
import convertEmail from "../util.js";
import "../styles/CurrentTrack.css";

const SPOTIFY_GET_CURRENT_TRACK_URL =
  "https://api.spotify.com/v1/me/player/currently-playing";

function CurrentTrack({ token }) {
  const [currentTrack, setCurrentTrack] = useState({});
  const [isListening, setIsListening] = useState(false);
  const userEmail = convertEmail(localStorage.getItem("user_email"));
  const endpoint = `http://localhost:8080/${backendEndpoint}/current-track/${userEmail}`;

  useEffect(() => {
    fetchCurrentTrack().then((result) => {
      if (result) {
        setCurrentTrack(result);
        setIsListening(true);
        pushCurrentTrackToDatabase(result);
      }
    });
  }, []);

  async function fetchCurrentTrack() {
    try {
      const response = await axios.get(SPOTIFY_GET_CURRENT_TRACK_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const result = response.data;
      const songId = result["item"]["id"];
      const songName = result["item"]["name"];
      const songArtists = result["item"]["artists"];
      let artistsNames = "";
      for (const artist of songArtists) {
        artistsNames += artist["name"] + ", ";
      }
      artistsNames = artistsNames.slice(0, -2); // to remove the last comma and space
      const songImageUrl = result["item"]["album"]["images"][0]["url"];
      const songLink = result["item"]["external_urls"]["spotify"];
      const previewUrl = result["item"]["preview_url"];

      const newCurrentTrack = {
        song_album: "",
        song_artists: artistsNames,
        email: userEmail,
        song_id: songId,
        song_image_url: songImageUrl,
        song_name: songName,
        song_url: songLink,
        preview_url: previewUrl,
      };

      return newCurrentTrack;
    } catch (error) {
      console.log("No current track is playing: ", error);
      setIsListening(false);
      return false;
    }
  }

  async function pushCurrentTrackToDatabase(newCurrentTrack) {
    // make POST request to the backend to insert the new current track
    try {
      const response = await axios.post(endpoint, newCurrentTrack);
      return response;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  function updateCurrentTrack() {
    fetchCurrentTrack().then((result) => {
      if (result) {
        setCurrentTrack(result);
        setIsListening(true);
        pushCurrentTrackToDatabase(result);
      }
    });
  }

  return (
    <div className="current-track">
      <div
        className="background"
        style={{ backgroundImage: `url(${currentTrack.song_image_url})` }}
      ></div>
      <div className="update">
        <text>Update what you are listening to</text>
        <button onClick={updateCurrentTrack}>Update</button>
      </div>
      <div className="song-info" id={isListening ? "show" : "hide"}>
        <div className="song-info-container">
          <text className="label">You listen to</text>
          <SongElements song={currentTrack} />
        </div>
      </div>
    </div>
  );
}

export default CurrentTrack;
