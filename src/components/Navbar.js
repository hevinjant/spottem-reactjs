import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar() {
  const [showLinks, setShowLinks] = useState(false);
  const toggleNavbar = () => {
    setShowLinks(!showLinks);
  };

  return (
    <div className="navbar">
      <div className="navbar-left" id={showLinks ? "show" : "hide"}>
        <div className="hiddenLinks">
          <Link to="/">Home</Link>
          <Link to="/">About</Link>
        </div>
      </div>
      <div className="navbar-right">
        <Link to="/">Home</Link>
        <Link to="/">About</Link>
        <button onClick={toggleNavbar}>Menu Icon</button>
      </div>
    </div>
  );
}

export default Navbar;
