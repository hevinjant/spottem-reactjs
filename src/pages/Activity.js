import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import ReactionItem from "../components/ReactionItem";
import SongHistory from "../components/SongHistory";
import { backendEndpoint } from "../Data";
import convertEmail from "../util";
import "../styles/Activity.css";

function Activity() {
  const [history, setHistory] = useState([]);
  let historyData = [];
  const userEmail = convertEmail(localStorage.getItem("user_email"));
  const endpoint = `http://localhost:8080/${backendEndpoint}/reactions`;

  useEffect(() => {
    fetchReactionsHistory().then((result) => {
      if (result) {
        historyData = result.filter((reaction) => {
          if (
            reaction.sender_email === userEmail ||
            reaction.email === userEmail
          ) {
            // convert String date to date object
            const date = Date.parse(reaction.time_stamp);
            reaction.time_stamp = date;

            return reaction;
          }
        });

        // sort the reaction data by time_stamp from latest to oldest
        historyData.sort((a, b) => b.time_stamp - a.time_stamp);
        setHistory(historyData);
      }

      // clean up useEffect
      return () => {
        setHistory({});
      };
    }, []);
  }, []);

  async function fetchReactionsHistory() {
    try {
      const response = await axios.get(endpoint);
      return response.data["reactions"];
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  return (
    <>
      <Navbar />
      <div className="activity">
        <div className="activity-left">
          <h1>Songs you have listened</h1>
          <div className="activity-left-container">
            <SongHistory />
          </div>
        </div>
        <div className="activity-right">
          <h1>Recent activity</h1>
          <div className="activity-right-container">
            {history.map((reaction, key) => {
              return <ReactionItem key={key} reaction={reaction} />;
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default Activity;
