import React, { useState, useEffect } from "react";
import {
  BrowserRouter,
  Route,
  Link,
  NavLink,
  useHistory,
  useNavigate,
} from "react-router-dom";
import leaderboard from "./Images/LeaderboardNew.png";
import match from "./Images/Match.png";
import events from "./Images/Events-2.png";
import profile from "./Images/MyProfile.png";
import { ClassNames } from "@emotion/react";
import { supabase } from "./supabaseClient";

function NavBar(props) {
  // const history = useHistory();
  const [online, setOnline] = useState(false);
  const [loading, setLoading] = useState(false);

  const triggerOnline = () => {
    setOnline(true);
    updateOnline(false);
  };

  // const passToProfile = () => {
  //   console.log("in pass to profile");
  //   setOnline(true);
  //   updateOnline(false);
  //   props.onViewTeleAlert(teleHandle);
  // };

  const updateOnline = async (currState) => {
    setLoading(true);
    try {
      const user = supabase.auth.user();

      const { error } = await supabase
        .from("profiles")
        .update({ click: currState }) // go to this column
        .eq("id", props.session.user.id); // find the specific user

      if (error) throw error;
    } catch (error) {
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <br></br>
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
            {/* {console.log(teleHandle)}
            {console.log(teleLoading)} */}
            {/* {teleLoading && (
              <NavLink to="/chatpage">
                TELE LOADING
                <h1>
                  <img
                    src={match}
                    id="chat"
                    height="170"
                    style={{ cursor: "pointer" }}
                  />
                </h1>
              </NavLink>
            )} */}
            {/* {!teleLoading && !teleHandle && (
              <NavLink to="/profilepage">
                <h1>
                  GO TO PROFILE
                  <img
                    src={match}
                    id="chat"
                    height="170"
                    style={{ cursor: "pointer" }}
                    onClick={passToProfile} //slower than updating teleHandle
                  />
                </h1>
              </NavLink>
            )} */}

            <NavLink to="/chatpage">
              <h1>
                {/* GO CHAT */}
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
    </>
  );
}

export default NavBar;
