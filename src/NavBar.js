import React from "react";
import { BrowserRouter, Route, Link, NavLink } from "react-router-dom";
import videologo from "./Images/VideoOfTheDay.png";
import leaderboard from "./Images/LeaderboardNew.png";
import match from "./Images/Match.png";
import events from "./Images/Events-2.png";
import { ClassNames } from "@emotion/react";

function NavBar() {
  return (
    <nav>
      <ul>
        <h3 className="child">
          <NavLink to="/videopage">
            <h1>
              <img
                src={videologo}
                id="video"
                height="170"
                style={{ cursor: "pointer" }}
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
              />
            </h1>
          </NavLink>
        </h3>
      </ul>
    </nav>
  );
}

export default NavBar;
