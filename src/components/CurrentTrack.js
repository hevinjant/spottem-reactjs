import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import "../styles/CurrentTrack.css";
import { backendEndpoint } from "../Data";

const dummyData = {
  album: "",
  artists: "Lana Del Rey",
  email: "travisphawley@gmail-com",
  song_id: "487OPlneJNni3NWC8SYqhW",
  image_url: "https://i.scdn.co/image/ab67616d0000b273cb76604d9c5963544cf5be64",
  track_name: "Born To Die",
  song_url: "https://open.spotify.com/track/487OPlneJNni3NWC8SYqhW",
};

function CurrentTrack() {
  const [currentTrack, setCurrentTrack] = useState({});
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    //setCurrentTrack(dummyData);

    fetchCurrentTrack().then((result) => {
      if (result) {
        setCurrentTrack(result);
        setIsListening(true);
      }
    });
  }, []);

  async function fetchCurrentTrack() {
    try {
      const response = await axios.get(
        "http://localhost:8080/" +
          backendEndpoint +
          "/current-track/hevin-jant@gmail-com"
      );
      return response;
    } catch (error) {
      console.log(error);
      setIsListening(false);
      return false;
    }
  }

  function updateCurrentTrack() {
    fetchCurrentTrack().then((result) => {
      if (result) {
        setCurrentTrack(result);
        setIsListening(true);
      }
    });
  }

  return (
    <div className="current-track">
      <div className="update">
        <text>Update what you are listening to</text>
        <button onClick={updateCurrentTrack}>Update</button>
      </div>
      <div className="song-info" id={isListening ? "show" : "hide"}>
        <text className="label">You listen to</text>
        <img src={currentTrack.image_url} alt="no image" />
        <text className="song-name">{currentTrack.track_name}</text>
        <text className="artist">by {currentTrack.artists}</text>
      </div>
    </div>
  );
}

export default CurrentTrack;
