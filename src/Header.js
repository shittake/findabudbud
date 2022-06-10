import { AppBar, Toolbar, Typography, makeStyles, Button, Avatar } from "@material-ui/core";
import { useState, useEffect } from "react";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import logo from "./Images/FindabudLogo.png";
import { supabase } from "./supabaseClient";


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

export default function Header({session}) {
  useEffect(() => {
    getProfile();
  }, [session]);

  const [points, setPoints] = useState(0);
  const [loading, setLoading] = useState(true);

  const { header, logo } = useStyles();


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
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };
  const displayDesktop = () => {
    return (<Toolbar className = 'myToolbar'>

    {findabudLogo}

    {getMenuButtons()}

    <div className = 'roundButton'
      onClick={()=>alert("FAQ")}>
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

    const getMenuButtons = () => {
    return (
      <h1 className="pointSystem">
        <div>
          {" "}
          <strong> Points: {points}</strong>
        </div>
        <div>
          {" "}
          <strong> Rank: Noob </strong>
        </div>
      </h1>
    );
  }

  return (
    <header>
      <AppBar className={header}>{displayDesktop()}</AppBar>
    </header>
  );
}