import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/FailedLogin.css";

function FailedLogin() {
  const navigate = useNavigate();

  function handleClick() {
    navigate("/");
  }

  return (
    <div className="failed-login">
      <h1>You have failed to log in to Spottem.</h1>
      <p>
        If you are a guest, please read the <a href="/guest">about app</a> to
        know more about this app.
      </p>
      <button onClick={handleClick}>Try log in again</button>
    </div>
  );
}

export default FailedLogin;
