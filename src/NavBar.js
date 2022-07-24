import React, { useState } from "react";
import { BrowserRouter, Route, Link, NavLink } from "react-router-dom";
import leaderboard from "./Images/LeaderboardNew.png";
import match from "./Images/Match.png";
import events from "./Images/Events-2.png";
import profile from "./Images/MyProfile.png";
import { ClassNames } from "@emotion/react";
import { supabase } from "./supabaseClient";

function NavBar({ session }) {
  const [online, setOnline] = useState(false);
  const [loading, setLoading] = useState(false);

  const triggerOnline = () => {
    setOnline(true);
    updateOnline(false);
  };

  const updateOnline = async (currState) => {
    setLoading(true);
    try {
      const user = supabase.auth.user();

      const { error } = await supabase
        .from("profiles")
        .update({ click: currState }) // go to this column
        .eq("id", session.user.id); // find the specific user

      if (error) throw error;
    } catch (error) {
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <nav>
      <ul>
        <h3 className="child">
          <NavLink to="/profilepage">
            <h1>
              <img
                src={profile}
                id="profilepage"
                height="170"
                style={{ cursor: "pointer" }}
                onClick={() => triggerOnline()}
              />
            </h1>
          </NavLink>
        </h3>

        <h3 className="child">
          <NavLink to="/firstpage">
            <h1>
              <img
                src={leaderboard}
                id="leaderboard"
                height="170"
                style={{ cursor: "pointer" }}
                onClick={() => triggerOnline()}
              />
            </h1>
          </NavLink>
        </h3>

        <h3 className="child">
          <NavLink to="/chatpage">
            <h1>
              <img
                src={match}
                id="chat"
                height="170"
                style={{ cursor: "pointer" }}
                onClick={() => updateOnline(true)}
              />
            </h1>
          </NavLink>
        </h3>

        <h3 className="child">
          <NavLink to="/eventspage">
            <h1>
              <img
                src={events}
                id="events"
                height="170"
                style={{ cursor: "pointer" }}
                onClick={() => triggerOnline()}
              />
            </h1>
          </NavLink>
        </h3>
      </ul>
    </nav>
  );
}

export default NavBar;
