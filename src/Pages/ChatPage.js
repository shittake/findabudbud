require("./ChatPage.css");
require("./Chat/Login.css");

import React from "react";
import ChatApp from "./Chat/ChatApp";
import HeaderMatch from "../Components/Header/HeaderMatch";
import Footer from "../Footer";
import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import ChatwootWidget from "../chatwoot.js";
import { Navigate, useNavigate } from "react-router-dom";
import useUpdateEffect from "src/Hooks/useUpdateEffect";

const ChatPage = ({ session, isLoading, numUsersOnline }) => {
  const [teleHandle, setTeleHandle] = useState(null); //initialise to null state
  const [teleLoading, setTeleLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTelegram = async () => {
      try {
        let { data: telegram, error } = await supabase
          .from("profiles")
          .select("telegram_handle")
          .eq("id", session.user.id);
        var temp = telegram[0].telegram_handle;
        let isValid = true;
        if (temp) {
          if (temp.charAt(0) == "@") {
            temp = temp.substring(1);
            if (temp) {
              setTeleHandle(true);
            } else {
              isValid = false;
              setTeleHandle(false);
            }
          } else {
            setTeleHandle(true);
          }
        } else {
          setTeleHandle(false);
        }
        // setAlertTele();
        // setTeleLoadingfalse);

        if (error) throw error;
        // if (isValid) {
        //   Navigate("arejio", { isValid });
        // history.push("/profile");
        // }
      } catch (error) {}
      setTeleLoading(false);
    };
    fetchTelegram();
  }, []);

  useUpdateEffect(() => {
    if (teleHandle !== true) {
      //navigate to profile page, with the error alert
      navigate("/profilepage", { state: { cameFromMatch: true } });
    }
  }, [teleLoading]);

  const [redirectNow, setRedirectNow] = useState(false);

  setTimeout(() => {
    setRedirectNow(true);
  }, 5000);

  useEffect(() => {
    const unloadCallback = (event) => {
      event.preventDefault();
      event.returnValue = "You will be removed from the waiting room";
      return updateOnline();
    };

    window.addEventListener("beforeunload", unloadCallback);
    return () => window.removeEventListener("beforeunload", unloadCallback);
  }, []);

  const [users, setUsers] = useState([]);
  const [click, setClick] = useState(false);
  const [loading, setLoading] = useState(false);
  const [goToProfile, setGoToProfile] = useState(false);

  const fetchData = async () => {
    const { data, error } = await supabase.from("profiles").select("*");

    setUsers(data);
    setClick(data.click);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const updateOnline = async () => {
    setLoading(true);
    try {
      const user = supabase.auth.user();

      const { error } = await supabase
        .from("profiles")
        .update({ click: false, online: false }) // go to this column
        .eq("id", session.user.id); // find the specific user

      if (error) throw error;
    } catch (error) {
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  const moveToHistory = () => {
    updateOnline();
    let path = "/historypage";
    navigate(path);
  };

  const addToFind = () => {
    var temp = mine.map((user) => user.telegram_handle)[0];
    if (temp == null || temp.localeCompare("null") == 0 || temp == "") {
      alert(
        "You have to provide your telegram handle in the Profile page before you can be matched with others!"
      );
      setGoToProfile(true);
    } else {
      setClick(true);
      updateClick(true);
    }
  };

  // Obtain my particulars from the database
  var mine = users.filter((user) => user.id == session.user.id);

  // Find the user.id of all the people who are currently online (updated < 1 hour ago)
  var onlineUsers = Array.from(
    users
      .filter((user) => new Date() - new Date(user.updated_at) <= 36000000000) // currently have 4 extra 0s
      .filter((user) => user.id != session.user.id) // can't match with myself!
      .map((user) => user.id)
  );

  var clickedUsernames = Array.from(
    users.filter((user) => user.click).map((user) => user.username)
  );

  var clickedAvatars = Array.from(
    users
      .filter((user) => user.click)
      .map((user) =>
        user.avatar_url != null
          ? user.avatar_url
          : "https://avatars.dicebear.com/api/bottts/1000.svg"
      )
  );

  return goToProfile ? (
    <>
      <Navigate to="/profilepage" />
    </>
  ) : redirectNow ? (
    <>
      <Navigate to="/secretpage" />
    </>
  ) : (
    <>
      <HeaderMatch
        session={session}
        isLoading={isLoading}
        numUsersOnline={numUsersOnline}
      />

      <div className="App">
        <ChatwootWidget />
      </div>

      {!mine.map((user) => user.click)[0] && (
        <>
          <p className="warning">
            You are not in the waiting room yet. To make your profile visible to
            others, click on another tab, and then the "Match now!" tab again.{" "}
          </p>
        </>
      )}

      {mine.map((user) => user.click)[0] && (
        <p className="success">
          {" "}
          You are in the waiting room now! Estimated time for a match: 5 seconds
        </p>
      )}

      <br></br>
      <p className="neutral">
        <span className="button5" id="history">
          <span onClick={moveToHistory}>
            {" "}
            Click to view your past match history and leave your ratings!
          </span>
        </span>
      </p>

      {clickedUsernames.length <= 0 ? (
        <>
          <p className="loading">
            {" "}
            No users waiting to be matched currently...{" "}
          </p>
        </>
      ) : (
        <div>
          {/*
        <p><center><strong> People with the most common interests with you </strong></center></p>
        {displayCommon().map(user => <p><center> {user} </center></p>)}

        */}

          <p className="loading">
            <strong>
              {" "}
              {clickedUsernames.length}
              {clickedUsernames.length == 1 && <span> user </span>}
              {clickedUsernames.length > 1 && <span> users </span>}
              waiting to be matched now...{" "}
            </strong>
          </p>

          <center>
            {clickedAvatars.map((user, index) => (
              <img key={index} src={user} height="100"></img>
            ))}
          </center>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
        </div>
      )}

      <Footer session={session} />
    </>
  );
};

export default ChatPage;
