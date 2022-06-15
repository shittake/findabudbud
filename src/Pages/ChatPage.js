require('./ChatPage.css');
require('./Chat/Login.css');

import React from 'react';
import ChatApp from './Chat/ChatApp';
import Header from "../Header";
import Footer from "../Footer";
import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import ChatwootWidget from "../chatwoot.js";
import { Navigate } from "react-router-dom";
import addToMatch from "./addToMatch";

const ChatPage = ({session}) => {

    const [redirectNow, setRedirectNow] = useState(false);
    
    setTimeout(() => 
      {setRedirectNow(true);}
      , 5000);

    const [users, setUsers] = useState([]);
    const [click, setClick] = useState(false);
    const [loading, setLoading] = useState(false);
    const [goToProfile, setGoToProfile] = useState(false);

    const fetchData = async () => {
        const {data, error} = await supabase.from('profiles').select('*')

    setUsers(data);
    }

    useEffect(() => {
    fetchData();
    },[])

    const addToFind = () => {
      var temp = mine.map(user => user.telegram_handle)[0];
      if (temp == null || temp.localeCompare("null") == 0 || temp == "") {
        alert("You have to provide your telegram handle in the Profile page before you can be matched with others!");
        setGoToProfile(true);
      }
      else {
        setClick(true);
        updateClick(true);
        
      }
    }


    const updateClick = async(currState) => {
      setLoading(true);
      try {
        const user = supabase.auth.user();

        const { error } = await supabase
          .from("profiles")
          .update({click: currState}) // go to this column
          .eq('id', session.user.id)   // find the specific user

        if (error) throw error;

      } catch (error) {
        alert(error.error_description || error.message);
      } finally {
        setLoading(false);
        window.location.reload(false); // force the page to refresh
      }
    };

    // Obtain my particulars from the database
    var mine = users.filter(user => user.id == session.user.id);

    // Find the user.id of all the people who are currently online (updated < 1 hour ago) 
    var onlineUsers = Array.from(users
      .filter(user => (new Date() - new Date(user.updated_at)) <= 36000000000) // currently have 4 extra 0s
      .filter(user => user.id != session.user.id) // can't match with myself!
      .map(user => user.id));

    var clickedUsernames = Array.from(users
      .filter(user => user.click)
      .map(user => user.username));

    var clickedAvatars = Array.from(users
      .filter(user => user.click)
      .map(user => (user.avatar_url!=null)?user.avatar_url:"https://avatars.dicebear.com/api/bottts/1000.svg"));

  return (

      goToProfile ? (
        <>
        <Navigate to="/profilepage" />
        </>
        ) :

      redirectNow ? (
        <>
        <Navigate to="/secretpage" />
        </>
        )
        :

      <>

      <Header session={session} />

      <div className="App">
        <ChatwootWidget />
      </div>

      <div className = "button4">
        <button2 onClick = {addToFind}> Click to start matching! </button2>
      </div>

      {(clickedUsernames.length <= 0)
       ? 
       <p className="loading"> No users waiting to be matched currently... </p> 
       : 
       <p> 
        
        {/*
        <p><center><strong> People with the most common interests with you </strong></center></p>
        {displayCommon().map(user => <p><center> {user} </center></p>)}

        */}

        <p className="loading"><strong> {clickedUsernames.length} 
        {clickedUsernames.length == 1  && <t> user </t>}
        {clickedUsernames.length > 1 && <t> users </t>} 
        waiting to be matched now... </strong></p>

        <center>{clickedAvatars.map(user => <img src={user} height="100"></img>)}</center>


        

       </p>
     }

      <Footer />
      </>

    );
}

export default ChatPage;