import React from "react";
import Snapshot1 from "../assets/homePageSS.png";
import Snapshot2 from "../assets/activityPageSS.png";
import "../styles/AppInfo.css";

function AppInfo() {
  return (
    <div className="app-info">
      <div className="app-info-container">
        <div className="intro">
          <p>
            Since the app is still in Spotify Development Mode, new users cannot
            log in to Spottem without having their email address registered
            manually in the Spotify developer dashboard's allowlist.
          </p>
          <a
            href="https://developer.spotify.com/documentation/web-api/guides/development-extended-quota-modes/"
            target="_blank"
          >
            More info
          </a>
        </div>
        <div className="feature">
          <p className="header">Feature</p>
          <p className="feature">
            - Spotify OAuth log in <br />
            - Update and show your current playing song <br />
            - See what song others listen to <br />
            - Like and unlike other people songs <br />
            - Add and remove friends <br />
            - See your song history <br />
            - See recent activity <br />
          </p>
        </div>
        <div className="snapshots">
          <p className="header">Snapshots</p>
          <img src={Snapshot1} alt=""></img>
          <img src={Snapshot2} alt=""></img>
        </div>
      </div>
    </div>
  );
}

export default AppInfo;
