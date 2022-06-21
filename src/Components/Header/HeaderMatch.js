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

const useStyles = makeStyles(() => ({
  header: {
    backgroundColor: "#400CCC",
  },
  logo: {
    fontFamily: "Work Sans, sans-serif",
    fontWeight: 600,
    color: "#FFFEFE",
    textAlign: "left",
  },
}));

const useStyles2 = makeStyles(() => ({
  header: {
    backgroundColor: "#400CCC",
  },
  logo2: {
    fontFamily: "Work Sans, sans-serif",
    fontWeight: 600,
    color: "yellow",
    textAlign: "left",
  },
}));

export default function HeaderMatch({ session }) {

  const [users, setUsers] = useState([]);
  const [history, setHistory] = useState(false);

  const fetchData = async () => {
  const {data, error} = await supabase.from('profiles').select('*')
  setUsers(data);
    }

  useEffect(() => {
  fetchData();
  },[])

  const formatDate = (dateString) => {
    const options = {hour12: false }
    return new Date(dateString).toLocaleString(undefined, options)
  }

  const toggleHistory = () => {
    setHistory(!history);
  }

  
  const steps = [
    {
      selector: "#chat",
      content: "Here, you can find people of similar interests to match with! To join the waiting room, follow the instructions given on this page."
    },
    {
      selector: "#chat2",
      content: "Click this button to join the waiting room. Otherwise, Your profile will not be visible to other users who are finding a match now, which may lower your chances of meeting new people. If you navigate to any another page, you will be taken out of the waiting room automatically! This is to ensure that every matched user is ready to start chatting :) However, if you stay on this page long enough without joining the waiting room, we will still try to help you find a match!"
    },
    {
      selector: "#history",
      content: "If you wish to see your past match history, as well as leave a rating for your previous matches (and see their ratings of you), click here!"
    }
  ];

  useEffect(() => {
    getProfile();
  }, [session]);

  const updateFirstTime = async () => {
    setLoading(true);
    try {
      const user = supabase.auth.user();

      const { error } = await supabase
        .from("profiles")
        .update({ firstTimeMatch: false })
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
  const [firstTimeMatch, setFirstTimeMatch] = useState(true); // Only during the first time a user logs in, the tutorial will be shown automatically


  const { header, logo } = useStyles();
  const { logo2 } = useStyles2();


  var i;
  const findTitle = (points) => {
    var answer = "";
    var pointCutoff = [0, 2, 10, 20, 30, 50, 75, 100, 140, 200];
    var titles = [
      "New User",
      "Novice",
      "Warming Up",
      "Journeyman",
      "Specialist",
      "Senior",
      "Master",
      "Grandmaster",
    ];

    for (i = 0; i < pointCutoff.length - 1; i++) {
      if (points >= pointCutoff[i] && points < pointCutoff[i + 1]) {
        answer = titles[i];
        break;
      }
    }
    if (answer == "") {
      return "God";
    } else {
      return answer;
    }
  };

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
        if (data.firstTimeMatch) setIsTourOpen(true);
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
      WAITING ROOM
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
          steps={steps}
          isOpen={isTourOpen}
          onRequestClose={() => {setIsTourOpen(false); setFirstTimeMatch(false); updateFirstTime()}}
        />
      )}
    </header>
  );
}
