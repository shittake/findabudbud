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

        if (error) throw error;
      } catch (error) {
        console.log(error);
      }
    };

    const updateUsersOnlineFalse = async () => {
      try {
        const { error } = await supabase
          .from("profiles")
          .update({ userOnline: 0 }) // go to this column
          .eq("id", session.user.id);
        console.log("finish");

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
      await updateUsersOnlineFalse();
    };
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout session={session} />}>
          <Route
            path="/"
            element={<Account key={session.user.id} session={session} />}
          />
          <Route
            path="profilepage"
            element={<ProfilePage session={session} />}
          />
          <Route
            path="firstpage"
            element={<LeaderboardPage session={session} />}
          />
          <Route path="chatpage" element={<ChatPage session={session} />} />
          <Route path="eventspage" element={<EventsPage session={session} />} />
          <Route path="secretpage" element={<SecretPage session={session} />} />
          <Route
            path="historypage"
            element={<ChatHistory session={session} />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
