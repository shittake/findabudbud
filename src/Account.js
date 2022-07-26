import { supabase } from "./supabaseClient";
import HeaderAvatar from "./Components/Header/HeaderAvatar";
import Footer from "./Footer";
import React, { useState, useEffect } from "react";
import Axios from "axios";
import ChatwootWidget from "./chatwoot";

const Account = ({ session }) => {
  const [sprite, setSprite] = useState("bottts");
  const [seed, setSeed] = useState(1000);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [avatar, setAvatarUrl] = useState(false);
  const [actualAvatar, setAvatar] = useState(null);
  const [points, setPoints] = useState(0);

  const getProfile = async () => {
    try {
      setLoading(true);
      const user = supabase.auth.user();

      let { data, error, status } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        if (data.avatar_url) {
          setAvatarUrl(true);
          setAvatar(data.avatar_url);
          setPoints(data.points);
        }
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProfile();
  }, [session]);

  const updateAvatar = async (link) => {
    setLoading(true);
    try {
      const user = supabase.auth.user();

      const { error } = await supabase
        .from("profiles")
        .update({ avatar_url: link }) // go to this column
        .eq("id", session.user.id); // find the specific user

      if (error) throw error;
    } catch (error) {
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };
  // Function to set the current sprite type
  function handleSprite(spritetype) {
    setSprite(spritetype);
  }

  // Function to generate random seeds for the API
  function handleGenerate() {
    let x = Math.floor(Math.random() * 1000);
    setSeed(x);
  }

  // Function to download image and save it in our computer
  function downloadImage(link) {
    updateAvatar(link);
    alert("Avatar chosen and saved!");
  }

  return (
    <div>
      <div className="App">
        <ChatwootWidget />
      </div>

      <HeaderAvatar session={session} />
      <div className="container">
        <div className="nav">
          {avatar == false ? (
            <p
              style={{
                padding: "10px 0 3px 15px",
              }}
            >
              You have not chosen an Avatar before. Choose an Avatar!{" "}
            </p>
          ) : (
            <div
              style={{
                padding: "10px 0 3px 15px",
              }}
            >
              You have selected an Avatar before, but you may choose another one
              here if you wish.{" "}
            </div>
          )}
        </div>
        <br></br>
        <h1>
          {avatar != false ? (
            <center>
              <p>
                Your previously selected Avatar is:{" "}
                <img src={actualAvatar} height={170} />
              </p>
            </center>
          ) : (
            <p></p>
          )}
        </h1>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <div className="home">
          <div className="btns" id="options">
            <button
              className="button3"
              disabled={points < 200}
              onClick={() => {
                handleSprite("avataaars");
              }}
            >
              Humans
            </button>
            <button
              className="button3"
              disabled={points < 200}
              onClick={() => {
                handleSprite("micah");
              }}
            >
              Humans 2
            </button>
            <button
              className="button3"
              onClick={() => {
                handleSprite("human");
              }}
            >
              Pixels
            </button>
            <button
              className="button3"
              onClick={() => {
                handleSprite("bottts");
              }}
            >
              Robots
            </button>
            <button
              className="button3"
              onClick={() => {
                handleSprite("jdenticon");
              }}
            >
              Shapes
            </button>
            <button
              className="button3"
              onClick={() => {
                handleSprite("identicon");
              }}
            >
              Patterns
            </button>
            <button
              className="button3"
              onClick={() => {
                handleSprite("gridy");
              }}
            >
              Aliens
            </button>
          </div>
          <div className="avatar" id="picture">
            <img
              src={`https://avatars.dicebear.com/api/${sprite}/${seed}.svg`}
              height="500"
              alt="Sprite"
            />
          </div>
          {/* <br></br> */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              margin: "10px",
            }}
          >
            <button
              className="button2"
              id="gen"
              onClick={() => {
                handleGenerate();
              }}
            >
              Randomly generate another Avatar
            </button>
            <button
              className="button2"
              id="down"
              onClick={() => {
                downloadImage(
                  `https://avatars.dicebear.com/api/${sprite}/${seed}.svg`
                );
              }}
            >
              Select this as my Avatar!
            </button>
          </div>

          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Account;
