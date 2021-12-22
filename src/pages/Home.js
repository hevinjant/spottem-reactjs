import React from "react";
import SongList from "../components/SongList";
import "../styles/Home.css";

function Home() {
  return (
    <div className="home">
      <div className="home-left"></div>
      <div className="home-mid">
        <h1>Your friends listen to</h1>
        <SongList />
      </div>
      <div className="home-right"></div>
    </div>
  );
}

export default Home;
