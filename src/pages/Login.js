import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Form from "../components/Form.js";
import SpottemLogo from "../assets/spottemLogo.png";
import axios from "axios";
import "../styles/Login.css";
import Background from "../assets/musicbg2.jpg";

// Spotify Oauth
import { SpotifyApiContext } from "react-spotify-api";
import { SpotifyAuth, Scopes } from "react-spotify-auth";
import "react-spotify-auth/dist/index.css";

function Login() {
  const [token, setToken] = useState("");

  let useremail = "";
  const localHostURL = "http://localhost:8080/http://10.20.5.89:5001/login";
  const herokuURL =
    "http://localhost:8080/https://spottem-307.herokuapp.com/login";

  async function getLoginUrl() {
    try {
      const response = await axios.get(localHostURL);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  const handleSubmitUseremail = (input) => {
    useremail = input;
    getLoginUrl().then((response) => {
      if (response) {
        console.log("USEREMAIL:", response["oauth_url"]);
        window.open(response["oauth_url"], "_self", "noopener,noreferrer");
      }
    });
  };

  return (
    <div className="login" style={{ backgroundImage: `url(${Background})` }}>
      <div className="login-inner-container">
        <img src={SpottemLogo}></img>

        <div className="spotify-oauth">
          {token ? (
            <SpotifyApiContext.Provider value={token}>
              {/* Your Spotify Code here */}
              {console.log("TOKEN IN LOGIN:", token)}
              <Link to={{ pathname: "/home", state: { token: token } }}>
                Continue to app
              </Link>
            </SpotifyApiContext.Provider>
          ) : (
            // Display the login page
            <SpotifyAuth
              redirectUri="http://localhost:3000/callback"
              clientID="8ad10722bf9f4c539591db26b5ae4abc"
              scopes={[
                Scopes.userReadPrivate,
                Scopes.userReadEmail,
                Scopes.userReadCurrentlyPlaying,
                Scopes.userLibraryRead,
                Scopes.playlistReadPrivate,
              ]} // either style will work
              onAccessToken={(token) => setToken(token)}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Login;
