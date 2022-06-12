import { supabase } from "./supabaseClient";
import Header from "./Header";
import Footer from "./Footer";
import React, { useState, useEffect } from 'react';
import Axios from 'axios';

const Account = ({ session }) => {
  const [sprite, setSprite] = useState("bottts");
  const [seed, setSeed] = useState(1000);
  const [loading, setLoading] = useState(true);
      
  const updateAvatar = async (link) => {
    setLoading(true);
    try {
      const user = supabase.auth.user();

      const { error } = await supabase
        .from("profiles")
        .update({avatar_url: link}) // go to this column
        .eq('id', session.user.id)   // find the specific user

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
      <>
      <Header session={session} />
        <div className="container">
            <div className="nav">
                <p>Choose an Avatar!</p>
            </div>
            <div className="home">
                <div className="btns">
                    <button onClick={() => { 
                        handleSprite("avataaars") }}>Human</button>
                    <button onClick={() => { 
                        handleSprite("human") }}>Pixel</button>
                    <button onClick={() => { 
                        handleSprite("bottts") }}>Bots</button>
                    <button onClick={() => { 
                        handleSprite("jdenticon") }}>Vector</button>
                    <button onClick={() => { 
                        handleSprite("identicon") }}>Identi</button>
                    <button onClick={() => { 
                        handleSprite("gridy") }}>Alien</button>
                    <button onClick={() => { 
                        handleSprite("micah") }}>Avatars</button>
                </div>
                <div className="avatar">
                    <img src=
{`https://avatars.dicebear.com/api/${sprite}/${seed}.svg`} alt="Sprite" />
                </div>
                <div className="generate">
                    <button id="gen" onClick={() => { 
                        handleGenerate() }}>Find another random avatar!</button>
                    <button id="down" onClick={() => { 
                        downloadImage(`https://avatars.dicebear.com/api/${sprite}/${seed}.svg`) }}>Select this as Avatar!</button>
                </div>
            </div>
        </div>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <Footer />
        </>
    );
}

export default Account;