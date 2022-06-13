require('./ChatPage.css');
require('./Chat/Login.css');

import React from 'react';
import ChatApp from './Chat/ChatApp';
import Header from "../Header";
import Footer from "../Footer";
import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import ChatwootWidget from "../chatwoot.js";

const ChatPage = ({session}) => {


    const [users, setUsers] = useState([]);
    const [click, setClick] = useState(false);
    const [loading, setLoading] = useState(false);

    const fetchData = async () => {
        const {data, error} = await supabase.from('profiles').select('*')

    setUsers(data);
    }

    useEffect(() => {
    fetchData();
    },[])

    const addToFind = () => {
      setClick(true);
      updateClick();
    }


    const updateClick = async() => {
      setLoading(true);
      try {
        const user = supabase.auth.user();

        const { error } = await supabase
          .from("profiles")
          .update({click: true}) // go to this column
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

    // Parameters to filter by
    var parameters = ["brawl_stars","mobile_legends","anime","french","korean"];

    // This method finds the people who have the most number of mutual interests with myself
    // Return type: An array consisting of the usernames of those people
    const displayCommon = () => {
      var temp = mapCommon();
      var mostInCommon = [];
      var index;
      var largest = 0;

      for (index = 0; index < onlineUsers.length; index++) {
        if (temp[1][index] > largest) {
          largest = temp[1][index];
          mostInCommon = [temp[0][index]];
        } else if (temp[1][index] == largest) {
          mostInCommon.push(temp[0][index]);
        }
      }
      return mostInCommon;
    }

    // This method aims to map each username to the number of mutual interests with myself
    const mapCommon = () => {
      var i;
      var who = [];
      var totalCommon = [];
      for (i = 0; i < onlineUsers.length; i++) {
        var currUser = users.filter(user => user.id == onlineUsers[i]);
        var currUserName = currUser.map(user => user.username);
        if (who.indexOf(currUserName) == -1){
           who.push(currUserName);
         }
        totalCommon.push(numberSimilar(currUser));
      }
      return [who, totalCommon];
    }

    // This method converts each column into a JSON string and compares its content with my values
    // Input type: The row of another user
    // Output: An integer representing the total number of mutual interests
    const numberSimilar = (currUser) => {
      var total = 0; var i;

      for (i = 0; i < parameters.length; i++) {
        if (JSON.stringify(currUser.map((val,key) => val[parameters[i]]))
          ===
          JSON.stringify(mine.map((val,key) => val[parameters[i]]))
          &&
          JSON.stringify(mine.map((val,key) => val[parameters[i]]))
          .slice(1,-1)
          .localeCompare("true") == 0) {
          total++;
        }
      }
      return total;
    }

  return (
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
       <p> No users waiting to be matched currently... </p> 
       : 
       <p> 
        
        {/*
        <p><center><strong> People with the most common interests with you </strong></center></p>
        {displayCommon().map(user => <p><center> {user} </center></p>)}

        */}

        <p><center><strong> Users waiting to be matched now... </strong></center></p>

        <center>{clickedAvatars.map(user => <img src={user} height="100"></img>)}</center>

        
        

       </p>
     }

      <Footer />
      </>

    );
}

export default ChatPage;