import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import MenuIcon from "@mui/icons-material/Menu";
import store from "../redux/store";
import "../styles/Navbar.css";

//const SPOTIFY_GET_USER_PROFILE_URL = "https://api.spotify.com/v1/me";

function Navbar() {
  const [showLinks, setShowLinks] = useState(false);
  const [user, setUser] = useState({
    userName: localStorage.getItem("user_name"),
    userImage: localStorage.getItem("user_image_url"),
  });

  //const token = useSelector((state) => state.access_token); // using redux
  //const token = localStorage.getItem("access_token"); // using localStorage

  // using subscribe to listen to any changes in the store
  const unsubscribe = store.subscribe(() => {
    const state = store.getState();
    setUser({
      userName: state.display_name,
      userEmail: state.email,
      userImage: state.image_url,
    });
  });

  unsubscribe();

  /*
  useEffect(() => {
    fetchUser().then((result) => {
      if (result) {
        setUser(result);
      }
    });
  }, []);

  async function fetchUser() {
    try {
      const response = await axios.get(SPOTIFY_GET_USER_PROFILE_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const result = response.data;
      const user = {
        display_name: result["display_name"],
        user_image_url: result["images"][0]["url"],
      };
      return user;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
*/

  const toggleNavbar = () => {
    setShowLinks(!showLinks);
  };

  return (
    <div className="navbar">
      <div className="navbar-left" id={showLinks ? "show" : "hide"}>
        <div className="user-display">
          <img src={user.userImage} alt="no img" />
          <text>{user.userName}</text>
        </div>
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
        <button onClick={toggleNavbar}>
          <MenuIcon />
        </button>
      </div>
    </div>
  );
}

export default Navbar;
