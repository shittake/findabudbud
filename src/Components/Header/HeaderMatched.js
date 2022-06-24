import {
  AppBar,
  Toolbar,
  Typography,
  makeStyles,
  Button,
  Avatar,
} from "@material-ui/core";
import { useState, useEffect } from "react";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { supabase } from "../../supabaseClient";
import Joyride from "react-joyride";
import Tour from "reactour";
import Popup from "../../Popup";
import findTitle from "../Methods/findTitle";
import { useStyles, useStylesName as useStyles2 } from "../Methods/useStyles";
import { HeaderMatchedTutorial } from "../Welcome/Tutorial";

export default function HeaderMatched({ session }) {

  const [users, setUsers] = useState([]);
  const [history, setHistory] = useState(false);

  const fetchData = async () => {
  const {data, error} = await supabase.from('profiles').select('*')
  setUsers(data);
    }

  useEffect(() => {
  fetchData();
  },[])

  const toggleHistory = () => {
    setHistory(!history);
  }

  useEffect(() => {
    getProfile();
  }, [session]);

  const updateFirstTime = async () => {
    setLoading(true);
    try {
      const user = supabase.auth.user();

      const { error } = await supabase
        .from("profiles")
        .update({ firstTimeMatched: false })
        .eq("id", session.user.id);

      if (error) throw error;
    } catch (error) {
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  const [points, setPoints] = useState(0);
  const [loading, setLoading] = useState(true);
  const [click, setClick] = useState(false);
  const [isTourOpen, setIsTourOpen] = useState(false);
  const [firstTimeMatched, setFirstTimeMatched] = useState(true); // Only during the first time a user logs in, the tutorial will be shown automatically


  const { header, logo } = useStyles();
  const { logo2 } = useStyles2();

  const clickFAQ = () => {
    setIsTourOpen(true);
  };

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
        setPoints(data.points);
        if (data.firstTimeMatched) setIsTourOpen(true);
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const displayDesktop = () => {
    return (
      <Toolbar className="myToolbar">
        {findabudLogo}

        {getMenuButtons()}

        <div className="roundButton" onClick={() => clickFAQ()}>
          ?
        </div>
      </Toolbar>
    );
  };

  const findabudLogo = (
    <>
    <Typography variant="h6" component="h1" className={logo}>
      FINDABUD
    </Typography>
    <Typography variant="h6" component="h1" className={logo2}>
      MATCH OUTCOME
    </Typography>
    </>
  );

  var onlineUsers = users.filter(user => (new Date() - new Date(user.updated_at)) <= 3600000).length;
  var myHistory = users.filter(user => user.id == session.user.id).map(user => user.point_history).toString().slice(1).split(",");
  const getMenuButtons = () => {
    return (
    <>
      <h1 className="pointSystem" onClick={toggleHistory}>
        <div>
          {" "}
          <strong> Points: {points}</strong>
        </div>
        <div>
          {" "}
          <strong> Rank: {findTitle(points)} </strong>
        </div>
      </h1>
      <p> Users Online now: {onlineUsers} </p>
    </>
    );
  };

  return (
    <header>
    {history && (
          <Popup
            content={
              <>
                <p><center><strong>Total points: {points} </strong></center></p>
                <p><center><strong>Your Point History</strong></center></p>
                <div className="formatTablePopup">
                  <table className = "table1">
                    <tr>
                      <th>Delta</th>
                      <th>Activity</th>
                      <th>Date</th>
                    </tr>
                    {
                      myHistory.map((value,key) =>{
                        return (
                      <tr key={key}>
                        <td>{value.split(" ")[0]}</td>
                        <td>{value.split(" ").slice(1,-4).join(" ")}</td>
                        <td>{value.split(" ").slice(-3).join(" ")}</td>
                      </tr>
                      );
                      })
                    }

                  </table>
                </div>
              </>
            }
            handleClose={toggleHistory}
          />
        )}
      <AppBar className={header}>{displayDesktop()}</AppBar>
      {isTourOpen && (
        <Tour
          steps={HeaderMatchedTutorial()}
          isOpen={isTourOpen}
          onRequestClose={() => {setIsTourOpen(false); setFirstTimeMatched(false); updateFirstTime()}}
        />
      )}
    </header>
  );
}
