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

export default function HeaderProfile({ session }) {

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
      selector: "#welcome-message",
      content:
        "Welcome to findabud! You may wish to watch this tutorial if this is your first time here.",
    },
    {
      selector: "#profile1",
      content: "If you have not done so yet, please update your profile!",
    },
    {
      selector: "#username",
      content: "Key in your username here. This will be shown on the leaderboard and to other users once a successful match is made!",
    },
    {
      selector: "#telegram_handle",
      content: "Key in your telegram handle here without the @ symbol in front. You will need to provide your handle before you can be matched with others!",
    },
    {
      selector: "#profile2",
      content: "Click on any of the five main headings below to show the specific subcategories. A filled box indicates that you'll like to include that as one of your matching criteria. Click on the respective boxes to toggle.",
    },
    {
      selector: "#profile3",
      content: "Click on this once you are done to save any changes made to your profile. You will also be recorded to have an ONLINE status for one hour only after clicking on this button.",
    },
    {
      selector: "#share",
      content: "Share this app with your friends and earn some points as you do so!",
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
        .update({ firstTimeProfile: false })
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
  const [firstTimeProfile, setFirstTimeProfile] = useState(true); // Only during the first time a user logs in, the tutorial will be shown automatically


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
        if (data.firstTimeProfile) setIsTourOpen(true);
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
      PROFILE PAGE
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
          onRequestClose={() => {setIsTourOpen(false); setFirstTimeProfile(false); updateFirstTime()}}
        />
      )}
    </header>
  );
}
