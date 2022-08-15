import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "../Pages/Layout";
import LeaderboardPage from "../Pages/LeaderboardPage";
import ChatPage from "../Pages/ChatPage";
import EventsPage from "../Pages/EventsPage";
import ProfilePage from "../Pages/ProfilePage";
import SecretPage from "../Pages/SecretPage";
import ChatHistory from "../Pages/ChatHistory";
import Account from "../Account";
import { useState, useEffect, useRef } from "react";
import { supabase } from "src/supabaseClient.js";
import useUpdateEffect from "src/Hooks/useUpdateEffect";

{
  /* To link to to other pages using Router */
}

export default function Router({ session }) {
  const ref = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchingCanStart, setFetchingCanStart] = useState(false);

  useEffect(() => {
    if (ref.current === null) {
      ref.current = false;
      return;
    }
    ref.current = true;

    const updateUsersOnlineTrue = async () => {
      try {
        const { error } = await supabase
          .from("profiles")
          .update({ userOnline: 1 }) // go to this column
          .eq("id", session.user.id);

        console.log("finish updating, fetching can start");
        setFetchingCanStart(true);

        if (error) throw error;
      } catch (error) {
        console.log(error);
      }
    };

    updateUsersOnlineTrue();
    return async () => {
      if (ref.current !== null) {
        ref.current = null;
      }
    };
  }, []);

  const [numUsersOnline, setNumUsersOnline] = useState(null);
  const fetchUsersOnline = async () => {
    const { data: online, error: err } = await supabase
      .from("profiles")
      .select("userOnline");

    // console.log(online);
    var totalUsersOnline = 0;
    for (let i = 0; i < online.length; i++) {
      totalUsersOnline += online[i].userOnline;
    }
    console.log("total users online: ", totalUsersOnline);
    setNumUsersOnline(totalUsersOnline);
    // console.log(totalUsersOnline);
    setIsLoading(false);
  };
  useUpdateEffect(() => {
    // console.log("subscription start");

    // console.log(mySubscription);

    const mySubscription = supabase
      .from("profiles")
      .on("*", (payload) => {
        console.log("Change received!", payload);
      })
      .subscribe();
    fetchUsersOnline();

    // console.log("after in");
    // console.log(mySubscription);

    return () => {
      supabase.removeSubscription(mySubscription);
      // console.log("subscription end");
    };
  }, [fetchingCanStart]);

  const [teleHandle, setTeleHandle] = useState();
  const viewTeleAlert = (input) => {
    console.log("in router");
    console.log(input);
    setTeleHandle(input);
  };

  return (
    <BrowserRouter forceRefresh>
      <Routes>
        <Route
          path="/"
          element={<Layout session={session} onViewTeleAlert={viewTeleAlert} />}
        >
          <Route
            path="/"
            element={
              <Account
                key={session.user.id}
                session={session}
                isLoading={isLoading}
                numUsersOnline={numUsersOnline}
              />
            }
          />
          <Route
            reloadDocument={true}
            path="profilepage"
            element={
              <ProfilePage
                session={session}
                onViewTeleAlert={teleHandle}
                isLoading={isLoading}
                numUsersOnline={numUsersOnline}
              />
            }
            key={Date.now()}
          />
          <Route
            path="firstpage"
            element={
              <LeaderboardPage
                session={session}
                isLoading={isLoading}
                numUsersOnline={numUsersOnline}
              />
            }
          />
          <Route
            path="chatpage"
            element={
              <ChatPage
                session={session}
                isLoading={isLoading}
                numUsersOnline={numUsersOnline}
              />
            }
          />
          <Route
            path="eventspage"
            element={
              <EventsPage
                session={session}
                isLoading={isLoading}
                numUsersOnline={numUsersOnline}
              />
            }
          />
          <Route
            path="secretpage"
            element={
              <SecretPage
                session={session}
                isLoading={isLoading}
                numUsersOnline={numUsersOnline}
              />
            }
          />
          <Route
            path="historypage"
            element={
              <ChatHistory
                session={session}
                isLoading={isLoading}
                numUsersOnline={numUsersOnline}
              />
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
