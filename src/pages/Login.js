import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SpottemLogo from "../assets/spottemLogo.png";
import axios from "axios";
import "../styles/Login.css";
import Background from "../assets/musicbg2.jpg";

// Spotify Oauth
import { SpotifyApiContext } from "react-spotify-api";
import { SpotifyAuth, Scopes } from "react-spotify-auth";
import "react-spotify-auth/dist/index.css";

// Redux
import store from "../redux/store";

const SPOTIFY_GET_USER_PROFILE_URL = "https://api.spotify.com/v1/me";

function Login() {
  const [token, setToken] = useState("");
  const navigate = useNavigate();

  function handleClick() {
    fetchUserInfo().then((result) => {
      if (result) {
        // store user info in redux store, NOTE: Redux state is cleared when user refreshes the page.
        store.dispatch({
          type: "SET_USERINFO",
          payload: {
            display_name: result.display_name,
            email: result.email,
            image_url: result.user_image_url,
          },
        });
      }
    });

    // store access token in redux store
    // store.dispatch({
    //   type: "SET_ACCESSTOKEN",
    //   payload: {
    //     access_token: token,
    //   },
    // });

    localStorage.setItem("access_token", token); // store access token in user's local machine
    //navigate("/home", { state: token }); // passing data to another page using useNavigate
    navigate("/home");
  }

  async function fetchUserInfo() {
    try {
      const response = await axios.get(SPOTIFY_GET_USER_PROFILE_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const result = response.data;
      const user = {
        display_name: result["display_name"],
        email: result["email"],
        user_image_url: result["images"][0]["url"],
      };
      console.log("logged in user: ", user);
      return user;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  return (
    <div className="login" style={{ backgroundImage: `url(${Background})` }}>
      <div className="login-inner-container">
        <img src={SpottemLogo}></img>

        <div className="spotify-oauth">
          {token ? (
            <SpotifyApiContext.Provider value={token}>
              <div className="success-login">
                <text>You have successfuly logged in</text>
                <button onClick={handleClick}>Continue to Spottem</button>
              </div>
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
              ]}
              onAccessToken={(token) => setToken(token)}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Login;
