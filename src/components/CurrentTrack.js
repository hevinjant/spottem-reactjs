import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import SongElements from "./SongElements";
import { backendEndpoint } from "../Data";
import "../styles/CurrentTrack.css";

const SPOTIFY_GET_CURRENT_TRACK_URL =
  "https://api.spotify.com/v1/me/player/currently-playing";

const dummyData = {
  album: "",
  artists: "Lana Del Rey",
  email: "travisphawley@gmail-com",
  song_id: "487OPlneJNni3NWC8SYqhW",
  image_url: "https://i.scdn.co/image/ab67616d0000b273cb76604d9c5963544cf5be64",
  track_name: "Born To Die",
  song_url: "https://open.spotify.com/track/487OPlneJNni3NWC8SYqhW",
};

function CurrentTrack({ token }) {
  const [currentTrack, setCurrentTrack] = useState({});
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    //setCurrentTrack(dummyData);

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

      const newCurrentTrack = {
        album: "",
        artists: artistsNames,
        email: "hevin-jant@gmail-com",
        song_id: songId,
        image_url: songImageUrl,
        track_name: songName,
        song_url: songLink,
      };

      return newCurrentTrack;
    } catch (error) {
      console.log("Failed to fetch current track: ", error);
      setIsListening(false);
      return false;
    }
  }

  async function pushCurrentTrackToDatabase(newCurrentTrack) {
    // make POST request to the backend to insert the new current track
    try {
      const response = await axios.post(
        "http://localhost:8080/" +
          backendEndpoint +
          "/current-track/hevin-jant@gmail-com",
        newCurrentTrack
      );
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
        style={{ backgroundImage: `url(${currentTrack.image_url})` }}
      >
        HELLO
      </div>
      <div className="update">
        <text>Update what you are listening to</text>
        <button onClick={updateCurrentTrack}>Update</button>
      </div>
      <div className="song-info" id={isListening ? "show" : "hide"}>
        <div className="song-info-container">
          <text className="label">You listen to</text>
          <SongElements
            song_image_url={currentTrack.image_url}
            song_name={currentTrack.track_name}
            artist={currentTrack.artists}
          />
        </div>
      </div>
    </div>
  );
}

export default CurrentTrack;
