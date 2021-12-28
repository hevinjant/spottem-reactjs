import React from "react";
import AppInfo from "../components/AppInfo";
import SpottemLogo from "../assets/spottemLogo.png";
import "../styles/Guest.css";

function Guest() {
  return (
    <div className="guest">
      <img className="logo" src={SpottemLogo} alt=""></img>
      <AppInfo />
      <a className="back-to-login" href="/">
        Log In
      </a>
    </div>
  );
}

export default Guest;
