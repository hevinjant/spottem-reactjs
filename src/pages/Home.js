import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import SongList from "../components/SongList";
import FriendsList from "../components/FriendsList";
import CurrentTrack from "../components/CurrentTrack";
import { backendEndpoint } from "../Data";
import convertEmail from "../util";
import { useSelector } from "react-redux";
import "../styles/Home.css";

function Home() {
  const [friends, setFriends] = useState([]);
  //const token = useLocation().state; // using useNavigate
  //const token = useSelector((state) => state.access_token); // using redux
  const token = localStorage.getItem("access_token"); // using localStorage
  const userEmail = convertEmail(localStorage.getItem("user_email"));
  const endpoint = `${backendEndpoint}/user/friends/${userEmail}`;

  useEffect(() => {
    fetchAllfriends().then((result) => {
      if (result) {
        setFriends(result);
      }
    });

    // clean up useEffect
    return () => {
      setFriends({});
    };
  }, []);

  async function fetchAllfriends() {
    try {
      const response = await axios.get(endpoint);
      return response.data["friends"];
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async function addFriendToDatabase(friendEmail) {
    try {
      const newFriendJson = {
        email: userEmail,
        friend_email: friendEmail,
      };
      const response = await axios.post(endpoint, newFriendJson);
      return response;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async function removeFriendFromDatabase(friendEmail) {
    try {
      const newFriendJson = {
        email: userEmail,
        friend_email: friendEmail,
      };
      // note: axios.delete() request shouldn't have request body, but to put body anyway do {data: json_data}
      const response = await axios.delete(endpoint, {
        data: newFriendJson,
      });
      return response;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  function handleAddFriend(email) {
    addFriendToDatabase(email).then((result) => {
      if (result) {
        if (result.status === 201) {
          setFriends([...friends, result.data["new_friend"]]);
        }
      }
    });
  }

  function handleRemoveFriend(email) {
    removeFriendFromDatabase(email).then((result) => {
      if (result) {
        if (result.status === 204) {
          const updatedFriends = friends.filter((friend) => {
            return friend.email !== email;
          });
          setFriends(updatedFriends);
        }
      }
    });
  }

  return (
    <>
      <Navbar />
      <div className="home">
        <div className="home-left">
          <CurrentTrack token={token} />
        </div>
        <div className="home-mid">
          <SongList friends={friends} />
        </div>
        <div className="home-right">
          <FriendsList
            friends={friends}
            handleAddFriend={handleAddFriend}
            handleRemoveFriend={handleRemoveFriend}
          />
        </div>
      </div>
    </>
  );
}

export default Home;
