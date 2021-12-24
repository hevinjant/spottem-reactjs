import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../styles/Navbar.css";

const dummyData = {};

const SPOTIFY_GET_USER_PROFILE_URL = "https://api.spotify.com/v1/me";

function Navbar() {
  const [showLinks, setShowLinks] = useState(false);
  const [user, setUser] = useState({});
  const token = "";

  useEffect(() => {});

  async function fetchUser() {
    try {
      const response = await axios.get(SPOTIFY_GET_USER_PROFILE_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  const toggleNavbar = () => {
    setShowLinks(!showLinks);
  };

  return (
    <div className="navbar">
      <div className="navbar-left" id={showLinks ? "show" : "hide"}>
        <div className="hiddenLinks">
          <Link to="/home">Home</Link>
          <Link to="/activity">Activity</Link>
          <Link to="/about">About</Link>
        </div>
      </div>
      <div className="navbar-right">
        <Link to="/home">Home</Link>
        <Link to="/activity">Activity</Link>
        <Link to="/about">About</Link>
        <button onClick={toggleNavbar}>Menu Icon</button>
      </div>
    </div>
  );
}

export default Navbar;
