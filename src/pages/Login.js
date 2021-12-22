import React from "react";
import Form from "../components/Form.js";
import SpottemLogo from "../assets/spottemLogo.png";
import axios from "axios";
import "../styles/Login.css";
import Background from "../assets/musicbg2.jpg";

function Login() {
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
        <h1>Enter your Spotify account email to continue</h1>
        <Form
          formLabel="Email"
          placeholder="Enter email..."
          handleFormSubmit={handleSubmitUseremail}
        />
        <button>Log In</button>
      </div>
    </div>
  );
}

export default Login;
