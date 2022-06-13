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
import logo from "./Images/FindabudLogo.png";
import { supabase } from "./supabaseClient";
import Joyride from "react-joyride";
import Tour from "reactour";
import Popup from "./Popup";

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

export default function Header({ session }) {

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
      content:
        "Key in your username here. This will be shown to other users as well as be displayed on the leaderboard!",
    },
    {
      selector: "#profile2",
      content:
        "There are 3 main categories - Games, TV Shows/Movies and Languages. To open up the more specific sub-categories, click on any of these!",
    },
    {
      selector: "#profile4",
      content:
        "A filled box means that you are interested in it, while an empty box means that you are not listing it as one of your preferences. Click on any of these boxes to toggle!",
    },
    {
      selector: "#profile3",
      content:
        "After you are done updating your profile, remember to click the update button!",
    },
    {
      selector: "#video",
      content:
        "Here, you can watch a randomly chosen video featuring one of the many preferences! Who knows, you may find a new one that you like!",
    },
    {
      selector: "#leaderboard",
      content:
        "See how you rank in Findabud against other users! Any titles or custom names that you earn will be displayed here as well.",
    },
    {
      selector: "#chat",
      content:
        "Match with someone with mutual interests and start chatting away!",
    },
    {
      selector: "#livechat",
      content:
        "If you ever need any assistance or wish to contact the developers directly to discuss improvements/new features, you can do so here! We will try to respond to you in 3 working days :D",
    },
    {
      selector: "#share",
      content:
        "Share this link with your friends and earn some extra points if you do so!",
    },
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
        .update({ firsttime: false })
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
  const [firstTime, setFirstTime] = useState(true); // Only during the first time a user logs in, the tutorial will be shown automatically


  const { header, logo } = useStyles();

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
        if (data.firsttime) setIsTourOpen(true);
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
    <Typography variant="h6" component="h1" className={logo}>
      FINDABUD
    </Typography>
  );

  var onlineUsers = users.filter(user => (new Date() - new Date(user.updated_at)) <= 3600000).length;
  var myHistory = users.filter(user => user.id == session.user.id).map(user => user.point_history).toString().slice(1,-1).split(",");
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
                        <td>{value.split(" ").slice(1,-1).join(" ")}</td>
                        <td>{value.split(" ")[value.split(" ").length-1]}</td>
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
          onRequestClose={() => {setIsTourOpen(false); setFirstTime(false); updateFirstTime()}}
        />
      )}
    </header>
  );
}
