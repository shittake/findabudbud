import { useState, useEffect } from "react";
import React from "react";
import { supabase } from "../supabaseClient";
import Header from "../Header";

const ProfilePage = ({ session }) => {
  const [username, setUsername] = useState(null);
  const [brawl_stars, setBrawlStars] = useState(null);

  const [users, setUsers] = useState([]);

  const fetchData = async () => {
    const { data, error } = await supabase.from("profiles").select("*");

    setUsers(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
  	<>
  	<Header session={session} />
  	<div> Help! </div>
  	</>
  	);
  }

export default ProfilePage;
