import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SpottemLogo from "../assets/spottemLogo.png";
import axios from "axios";
import Background from "../assets/musicbg2.jpg";
import { backendEndpoint } from "../Data";
import convertEmail from "../util";
import "../styles/Login.css";

// Spotify Oauth
import { SpotifyApiContext } from "react-spotify-api";
import { SpotifyAuth, Scopes } from "react-spotify-auth";
import "react-spotify-auth/dist/index.css";

// Redux
import { useDispatch } from "react-redux";
import { setAccessToken, setUserInfo } from "../redux/action";

const SPOTIFY_GET_USER_PROFILE_URL = "https://api.spotify.com/v1/me";
const redirectURL = "https://spottem-frontend.herokuapp.com/callback";
//const redirectURL = "http://localhost:3000/callback";

function Login() {
  const [token, setToken] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const endpoint = `${backendEndpoint}/user`; // + email

  function handleClick() {
    fetchUserInfo().then((result) => {
      if (result) {
        // store user info in redux store, NOTE: Redux state is cleared when user refreshes the page.
        dispatch(
          setUserInfo(result.display_name, result.email, result.user_image_url)
        );
        // store user info in local storage
        localStorage.setItem("user_name", result.display_name);
        localStorage.setItem("user_email", result.email);
        localStorage.setItem("user_image_url", result.user_image_url);
        localStorage.setItem("access_token", token); // store access token in user's local machine
        navigate("/home");
      }
    });

    // store.dispatch(setAccessToken(token)); // store access token in redux store

    //navigate("/home", {state: { access_token: token, email: result.email },}); // passing data to another page using useNavigate
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
      insertUserToBackend(result);
      return user;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async function insertUserToBackend(userData) {
    try {
      const email = convertEmail(userData["email"]);
      const response = await axios.post(endpoint + `/${email}`, userData);
      return response;
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
              redirectUri={redirectURL}
              clientID="8ad10722bf9f4c539591db26b5ae4abc"
              scopes={[
                Scopes.userReadPrivate,
                Scopes.userReadEmail,
                Scopes.userReadCurrentlyPlaying,
                Scopes.userLibraryRead,
                Scopes.playlistReadPrivate,
              ]}
              onAccessToken={(token) => setToken(token)}
              showDialog={true} // to always requires user to agree on the Spotify website
            />
          )}
        </div>
        <a className="about-app" href="/guest">
          About this app
        </a>
      </div>
    </div>
  );
}

export default Login;
