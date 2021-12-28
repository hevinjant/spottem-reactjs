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

const dummyData = [
  {
    _id: "61a845c942919de1604f7829",
    current_track: {
      album: "",
      artist: "Depeche Mode",
      email: "limassnursalim@gmail-com",
      song_id: "7dhM0KUBxuZV9z5iNodLyn",
      song_image_url:
        "https://i.scdn.co/image/ab67616d0000b273e5158bfb0005da06d5d7c0eb",
      song_name: "Personal Jesus - 2006 Remaster",
      song_url: "https://open.spotify.com/track/7dhM0KUBxuZV9z5iNodLyn",
    },
    email: "limassnursalim@gmail-com",
    friends: ["hevin-jant@gmail-com", "travisphawley@gmail-com"],
    is_online: true,
    name: "Limas Nursalim",
    song_history: [
      {
        _id: "61a86313f249ccde591d22fd",
        album: "",
        artist: "Aqua",
        email: "limassnursalim@gmail-com",
        reactions: [
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
        ],
        song_id: "2RSOzvKUnfDDrb2nQPfpQU",
        song_image_url:
          "https://i.scdn.co/image/ab67616d0000b273b5997b95ed07c8a825e0273b",
        song_name: "Barbie Girl",
        song_url: "https://open.spotify.com/track/2RSOzvKUnfDDrb2nQPfpQU",
      },
      {
        _id: "61a86377cbc205a8eb675b7f",
        album: "",
        artist: "The Tokens",
        email: "limassnursalim@gmail-com",
        reactions: [
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
        ],
        song_id: "2F4FNcz68howQWD4zaGJSi",
        song_image_url:
          "https://i.scdn.co/image/ab67616d0000b2739df742dcaf9b79edad9009d0",
        song_name: "The Lion Sleeps Tonight (Wimoweh)",
        song_url: "https://open.spotify.com/track/2F4FNcz68howQWD4zaGJSi",
      },
    ],
    user_dp: "https://i.scdn.co/image/ab6775700000ee85666a854c44b9ea5d7442f38e",
    user_id: "21uyl3oinyci4n5mibl6cuf4y",
  },
  {
    _id: "61a872ab8b24e889529d524d",
    current_track: {
      album: "",
      artist: "Lana Del Rey",
      email: "travisphawley@gmail-com",
      song_id: "487OPlneJNni3NWC8SYqhW",
      song_image_url:
        "https://i.scdn.co/image/ab67616d0000b273cb76604d9c5963544cf5be64",
      song_name: "Born To Die",
      song_url: "https://open.spotify.com/track/487OPlneJNni3NWC8SYqhW",
    },
    email: "travisphawley@gmail-com",
    friends: ["hevin-jant@gmail-com", "nguyenaiden321@gmail-com"],
    is_online: false,
    name: "thawlf",
    song_history: [
      {
        _id: "61a8773b3a6ca816b8279813",
        album: "",
        artist: "INXS",
        email: "travisphawley@gmail-com",
        reactions: [
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
        ],
        song_id: "5eU8qMd0TpaLqTGDZJaLDs",
        song_image_url:
          "https://i.scdn.co/image/ab67616d0000b2734053ce7818f114a4e8dde08f",
        song_name: "Need You Tonight",
        song_url: "https://open.spotify.com/track/5eU8qMd0TpaLqTGDZJaLDs",
      },
      {
        _id: "61a877993ee2f3c32dc10a05",
        album: "",
        artist: "Polo & Pan",
        email: "travisphawley@gmail-com",
        reactions: [
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
        ],
        song_id: "260V7huyJrXnyYe0dFv2Fa",
        song_image_url:
          "https://i.scdn.co/image/ab67616d0000b2734ee9468123f381eb8d5e05bb",
        song_name: "Canopée",
        song_url: "https://open.spotify.com/track/260V7huyJrXnyYe0dFv2Fa",
      },
      {
        _id: "61a87804d636a2fa036f1b8c",
        album: "",
        artist: "Kid Cudi, MGMT, Ratatat",
        email: "travisphawley@gmail-com",
        reactions: [
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
        ],
        song_id: "5iSEsR6NKjlC9SrIJkyL3k",
        song_image_url:
          "https://i.scdn.co/image/ab67616d0000b273aab2c3c3f1f3207137d915c9",
        song_name: "Pursuit Of Happiness (Nightmare)",
        song_url: "https://open.spotify.com/track/5iSEsR6NKjlC9SrIJkyL3k",
      },
      {
        _id: "61a878b0b5cf3fae81b39317",
        album: "",
        artist: "Depeche Mode",
        email: "travisphawley@gmail-com",
        reactions: [],
        song_id: "7dhM0KUBxuZV9z5iNodLyn",
        song_image_url:
          "https://i.scdn.co/image/ab67616d0000b273e5158bfb0005da06d5d7c0eb",
        song_name: "Personal Jesus - 2006 Remaster",
        song_url: "https://open.spotify.com/track/7dhM0KUBxuZV9z5iNodLyn",
      },
      {
        _id: "61a98e341548fe9d32a5396d",
        album: "",
        artist: "Lana Del Rey",
        email: "travisphawley@gmail-com",
        reactions: [],
        song_id: "487OPlneJNni3NWC8SYqhW",
        song_image_url:
          "https://i.scdn.co/image/ab67616d0000b273cb76604d9c5963544cf5be64",
        song_name: "Born To Die",
        song_url: "https://open.spotify.com/track/487OPlneJNni3NWC8SYqhW",
      },
      {
        _id: "61a994ab96596e9cfcb2cb47",
        album: "",
        artist: "Paul Simon",
        email: "travisphawley@gmail-com",
        reactions: [],
        song_id: "6vxHp3CDNo0afgKGp2yi1E",
        song_image_url:
          "https://i.scdn.co/image/ab67616d0000b27337a40ab12a4fb96319a9d96f",
        song_name: "Me and Julio Down by the Schoolyard",
        song_url: "https://open.spotify.com/track/6vxHp3CDNo0afgKGp2yi1E",
      },
      {
        _id: "61a9aa03a243da701f536d9a",
        album: "",
        artist: "Rod Stewart",
        email: "travisphawley@gmail-com",
        reactions: [],
        song_id: "6rovOdp3HgK1DeAMYDzoA7",
        song_image_url:
          "https://i.scdn.co/image/ab67616d0000b273f20825485137abccd82b9665",
        song_name: "Maggie May",
        song_url: "https://open.spotify.com/track/6rovOdp3HgK1DeAMYDzoA7",
      },
      {
        _id: "61a9aa735a60c4e558ada318",
        album: "",
        artist: "Travis Scott",
        email: "travisphawley@gmail-com",
        reactions: [],
        song_id: "4R67rQNSbbsR4TdUVOIdez",
        song_image_url:
          "https://i.scdn.co/image/ab67616d0000b273eba68473429f9f4eaf1943d0",
        song_name: "ESCAPE PLAN",
        song_url: "https://open.spotify.com/track/4R67rQNSbbsR4TdUVOIdez",
      },
    ],
    user_dp: null,
    user_id: "thawlf",
  },
  {
    _id: "61a848c87e0eaf1268b99ca1",
    current_track: {
      album: "",
      artist: "my bloody valentine",
      email: "nguyenaiden321@gmail-com",
      song_id: "3HfEgAaf0koxBpBB8NvGda",
      song_image_url:
        "https://i.scdn.co/image/ab67616d0000b2730ede770070357575bc050511",
      song_name: "When You Sleep",
      song_url: "https://open.spotify.com/track/3HfEgAaf0koxBpBB8NvGda",
    },
    email: "nguyenaiden321@gmail-com",
    friends: [
      "hevin-jant@gmail-com",
      "limassnursalim@gmail-com",
      "travisphawley@gmail-com",
    ],
    is_online: true,
    name: "Aiden",
    song_history: [
      {
        _id: "61a86180437aa44880722acb",
        album: "",
        artist: "Talking Heads",
        email: "nguyenaiden321@gmail-com",
        reactions: [
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
        ],
        song_id: "1Tr4K5MU5XYE44umXGDndd",
        song_image_url:
          "https://i.scdn.co/image/ab67616d0000b273f9e2d82b9969defab2105859",
        song_name: "Once in a Lifetime",
        song_url: "https://open.spotify.com/track/1Tr4K5MU5XYE44umXGDndd",
      },
      {
        _id: "61a8626a8eaaab0458ac84e5",
        album: "",
        artist: "Andrew W.K.",
        email: "nguyenaiden321@gmail-com",
        reactions: [
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
        ],
        song_id: "4rQatGGd4NNNNa1znkA9aO",
        song_image_url:
          "https://i.scdn.co/image/ab67616d0000b273e4d5b8415d3861bba6572673",
        song_name: "She Is Beautiful",
        song_url: "https://open.spotify.com/track/4rQatGGd4NNNNa1znkA9aO",
      },
      {
        _id: "61aa651238af3a937590c23e",
        album: "",
        artist: "my bloody valentine",
        email: "nguyenaiden321@gmail-com",
        reactions: [],
        song_id: "3HfEgAaf0koxBpBB8NvGda",
        song_image_url:
          "https://i.scdn.co/image/ab67616d0000b2730ede770070357575bc050511",
        song_name: "When You Sleep",
        song_url: "https://open.spotify.com/track/3HfEgAaf0koxBpBB8NvGda",
      },
      {
        _id: "61aa69986dc6dc4a4491681f",
        album: "",
        artist: "Lana Del Rey",
        email: "nguyenaiden321@gmail-com",
        reactions: [],
        song_id: "487OPlneJNni3NWC8SYqhW",
        song_image_url:
          "https://i.scdn.co/image/ab67616d0000b273cb76604d9c5963544cf5be64",
        song_name: "Born To Die",
        song_url: "https://open.spotify.com/track/487OPlneJNni3NWC8SYqhW",
      },
    ],
    user_dp: "https://i.scdn.co/image/ab6775700000ee85fc1641f5db17cb2b18c5b488",
    user_id: "youlittlepoop",
  },
];

function Home() {
  const [friends, setFriends] = useState([]);
  //const token = useLocation().state; // using useNavigate
  //const token = useSelector((state) => state.access_token); // using redux
  const token = localStorage.getItem("access_token"); // using localStorage
  const userEmail = convertEmail(localStorage.getItem("user_email"));
  const endpoint = `${backendEndpoint}/user/friends/${userEmail}`;

  useEffect(() => {
    //setfriends(dummyData);

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
