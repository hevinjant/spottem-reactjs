import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import ReactionItem from "../components/ReactionItem";
import "../styles/Activity.css";

const dummyData = [
  {
    _id: "61a87b75f0f6d373e5290335",
    album: "",
    artist: "INXS",
    email: "travisphawley@gmail-com",
    name: "thawlf",
    sender_email: "limassnursalim@gmail-com",
    sender_name: "Limas Nursalim",
    song_id: "5eU8qMd0TpaLqTGDZJaLDs",
    song_image_url:
      "https://i.scdn.co/image/ab67616d0000b2734053ce7818f114a4e8dde08f",
    song_name: "Need You Tonight",
    song_url: "https://open.spotify.com/track/5eU8qMd0TpaLqTGDZJaLDs",
    time_stamp: "Thu Dec 02 2021 12:23:41 GMT-0800 (PST)",
  },
  {
    _id: "61a87bdde160b9b7289bec4e",
    album: "",
    artist: "INXS",
    email: "travisphawley@gmail-com",
    name: "thawlf",
    sender_email: "hevin-jant@gmail-com",
    sender_name: "Hevin Jant",
    song_id: "5eU8qMd0TpaLqTGDZJaLDs",
    song_image_url:
      "https://i.scdn.co/image/ab67616d0000b2734053ce7818f114a4e8dde08f",
    song_name: "Need You Tonight",
    song_url: "https://open.spotify.com/track/5eU8qMd0TpaLqTGDZJaLDs",
    time_stamp: "Thu Dec 02 2021 01:55:21 GMT-0800 (PST)",
  },
  {
    _id: "61a87caf09eb57575246d021",
    album: "",
    artist: "Polo & Pan",
    email: "travisphawley@gmail-com",
    name: "thawlf",
    sender_email: "nguyenaiden321@gmail-com",
    sender_name: "Aiden",
    song_id: "260V7huyJrXnyYe0dFv2Fa",
    song_image_url:
      "https://i.scdn.co/image/ab67616d0000b2734ee9468123f381eb8d5e05bb",
    song_name: "Canopée",
    song_url: "https://open.spotify.com/track/260V7huyJrXnyYe0dFv2Fa",
    time_stamp: "Thu Dec 02 2021 05:28:33 GMT-0800 (PST)",
  },
  {
    _id: "61a87d5a22235d26ed6ab7d3",
    album: "",
    artist: "Kid Cudi, MGMT, Ratatat",
    email: "travisphawley@gmail-com",
    name: "thawlf",
    sender_email: "nguyenaiden321@gmail-com",
    sender_name: "Aiden",
    song_id: "5iSEsR6NKjlC9SrIJkyL3k",
    song_image_url:
      "https://i.scdn.co/image/ab67616d0000b273aab2c3c3f1f3207137d915c9",
    song_name: "Pursuit Of Happiness (Nightmare)",
    song_url: "https://open.spotify.com/track/5iSEsR6NKjlC9SrIJkyL3k",
    time_stamp: "Thu Dec 02 2021 11:28:33 GMT-0800 (PST)",
  },
  {
    _id: "61a87d7b91f3e7675abe9a0e",
    album: "",
    artist: "Kid Cudi, MGMT, Ratatat",
    email: "travisphawley@gmail-com",
    name: "thawlf",
    sender_email: "limassnursalim@gmail-com",
    sender_name: "Limas Nursalim",
    song_id: "5iSEsR6NKjlC9SrIJkyL3k",
    song_image_url:
      "https://i.scdn.co/image/ab67616d0000b273aab2c3c3f1f3207137d915c9",
    song_name: "Pursuit Of Happiness (Nightmare)",
    song_url: "https://open.spotify.com/track/5iSEsR6NKjlC9SrIJkyL3k",
    time_stamp: "Wed Dec 01 2021 21:52:45 GMT-0800 (PST)",
  },
  {
    _id: "61a87d8d0d5005cef386a5ee",
    album: "",
    artist: "Kid Cudi, MGMT, Ratatat",
    email: "travisphawley@gmail-com",
    name: "thawlf",
    sender_email: "hevin-jant@gmail-com",
    sender_name: "Hevin Jant",
    song_id: "5iSEsR6NKjlC9SrIJkyL3k",
    song_image_url:
      "https://i.scdn.co/image/ab67616d0000b273aab2c3c3f1f3207137d915c9",
    song_name: "Pursuit Of Happiness (Nightmare)",
    song_url: "https://open.spotify.com/track/5iSEsR6NKjlC9SrIJkyL3k",
    time_stamp: "Wed Dec 01 2021 22:02:15 GMT-0800 (PST)",
  },
  {
    _id: "61a87e626815861c5e813221",
    album: "",
    artist: "Talking Heads",
    email: "nguyenaiden321@gmail-com",
    name: "Aiden",
    sender_email: "travisphawley@gmail-com",
    sender_name: "thawlf",
    song_id: "1Tr4K5MU5XYE44umXGDndd",
    song_image_url:
      "https://i.scdn.co/image/ab67616d0000b273f9e2d82b9969defab2105859",
    song_name: "Once in a Lifetime",
    song_url: "https://open.spotify.com/track/1Tr4K5MU5XYE44umXGDndd",
    time_stamp: "Wed Dec 01 2021 02:02:15 GMT-0800 (PST)",
  },
  {
    _id: "61a87eb89c2b62ffb45eba47",
    album: "",
    artist: "Andrew W.K.",
    email: "nguyenaiden321@gmail-com",
    name: "Aiden",
    sender_email: "travisphawley@gmail-com",
    sender_name: "thawlf",
    song_id: "4rQatGGd4NNNNa1znkA9aO",
    song_image_url:
      "https://i.scdn.co/image/ab67616d0000b273e4d5b8415d3861bba6572673",
    song_name: "She Is Beautiful",
    song_url: "https://open.spotify.com/track/4rQatGGd4NNNNa1znkA9aO",
    time_stamp: "Thu Dec 02 2021 18:28:33 GMT-0800 (PST)",
  },
  {
    _id: "61a87f39585b4b5d62371001",
    album: "",
    artist: "Aqua",
    email: "limassnursalim@gmail-com",
    name: "Limas Nursalim",
    sender_email: "travisphawley@gmail-com",
    sender_name: "thawlf",
    song_id: "2RSOzvKUnfDDrb2nQPfpQU",
    song_image_url:
      "https://i.scdn.co/image/ab67616d0000b273b5997b95ed07c8a825e0273b",
    song_name: "Barbie Girl",
    song_url: "https://open.spotify.com/track/2RSOzvKUnfDDrb2nQPfpQU",
    time_stamp: "Thu Dec 02 2021 15:28:33 GMT-0800 (PST)",
  },
  {
    _id: "61a87f77d9a66a6d996b9d9c",
    album: "",
    artist: "The Tokens",
    email: "limassnursalim@gmail-com",
    name: "Limas Nursalim",
    sender_email: "travisphawley@gmail-com",
    sender_name: "thawlf",
    song_id: "2F4FNcz68howQWD4zaGJSi",
    song_image_url:
      "https://i.scdn.co/image/ab67616d0000b2739df742dcaf9b79edad9009d0",
    song_name: "The Lion Sleeps Tonight (Wimoweh)",
    song_url: "https://open.spotify.com/track/2F4FNcz68howQWD4zaGJSi",
    time_stamp: "Wed Dec 01 2021 10:02:15 GMT-0800 (PST)",
  },
  {
    _id: "61a87fd403b06c40a3136930",
    album: "",
    artist: "Oasis",
    email: "hevin-jant@gmail-com",
    name: "Hevin Jant",
    sender_email: "travisphawley@gmail-com",
    sender_name: "thawlf",
    song_id: "7ppPZa3TRUSGKaks9wH7VT",
    song_image_url:
      "https://i.scdn.co/image/ab67616d0000b2732f2eeee9b405f4d00428d84c",
    song_name: "Don't Look Back In Anger",
    song_url: "https://open.spotify.com/track/7ppPZa3TRUSGKaks9wH7VT",
    time_stamp: "Wed Dec 01 2021 12:08:05 GMT-0800 (PST)",
  },
  {
    _id: "61a88007ec8905fef7110aeb",
    album: "",
    artist: "Stromae",
    email: "hevin-jant@gmail-com",
    name: "Hevin Jant",
    sender_email: "travisphawley@gmail-com",
    sender_name: "thawlf",
    song_id: "1QFw2xxyQtgKjlrMCEqsNj",
    song_image_url:
      "https://i.scdn.co/image/ab67616d0000b273e742841accccf949d7af1b75",
    song_name: "Papaoutai",
    song_url: "https://open.spotify.com/track/1QFw2xxyQtgKjlrMCEqsNj",
    time_stamp: "Wed Dec 01 2021 05:08:05 GMT-0800 (PST)",
  },
  {
    _id: "61a990c296596e9cfcb2ca96",
    album: "",
    artist: "Lana Del Rey",
    email: "hevin-jant@gmail-com",
    name: "Hevin Jant",
    sender_email: "travisphawley@gmail-com",
    sender_name: "thawlf",
    song_id: "2Y115i0IhELJhyyftvoSFt",
    song_image_url:
      "https://i.scdn.co/image/ab67616d0000b273cb76604d9c5963544cf5be64",
    song_name: "Dark Paradise",
    song_url: "https://open.spotify.com/track/2Y115i0IhELJhyyftvoSFt",
    time_stamp: "Thu Dec 02 2021 19:36:32 GMT-0800 (PST)",
  },
  {
    _id: "61a99aa696596e9cfcb2ccb2",
    album: "",
    artist: "Elton John",
    email: "travisphawley@gmail-com",
    name: "thawlf",
    sender_email: "nguyenaiden321@gmail-com",
    sender_name: "Aiden",
    song_id: "0a93gOQyRFfc2tVtup7JVP",
    song_image_url:
      "https://i.scdn.co/image/ab67616d0000b273d7094d37cb88fd125c26e701",
    song_name: "Tiny Dancer",
    song_url: "https://open.spotify.com/track/0a93gOQyRFfc2tVtup7JVP",
    time_stamp: "Thu Dec 02 2021 20:18:44 GMT-0800 (PST)",
  },
];

function Activity() {
  const [history, setHistory] = useState([]);
  let historyData = [];

  useEffect(() => {
    fetchReactionsHistory().then((result) => {
      if (result) {
        historyData = result.filter((reaction) => {
          if (
            reaction.sender_email === "hevin-jant@gmail-com" ||
            reaction.email === "hevin-jant@gmail-com"
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
    });

    // historyData = dummyData.filter((reaction) => {
    //   if (
    //     reaction["sender_email"] === "hevin-jant@gmail-com" ||
    //     reaction["email"] === "hevin-jant@gmail-com"
    //   ) {
    //     return reaction;
    //   }
    // });
    // console.log(historyData);
    // setHistory(historyData);
  }, []);

  async function fetchReactionsHistory() {
    try {
      const response = await axios.get(
        "http://localhost:8080/http://10.20.5.89:5001/reactions"
      );
      console.log("ACTIVITY RESPONSE: ", response.data["reactions"]);
      return response.data["reactions"];
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  return (
    <div className="activity">
      <div className="activity-left"></div>
      <div className="activity-right">
        {history.map((reaction, key) => {
          return <ReactionItem key={key} reaction={reaction} />;
        })}
      </div>
    </div>
  );
}

export default Activity;
