import React from "react";
import Navbar from "../components/Navbar";
import AppInfo from "../components/AppInfo";
import "../styles/About.css";

function About() {
  return (
    <>
      <Navbar />
      <div className="about">
        <AppInfo />
      </div>
    </>
  );
}

export default About;
