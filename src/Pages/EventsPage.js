import { useState, useEffect } from "react";
import React from "react";
import { supabase } from "../supabaseClient";

const EventsPage = ({session}) => {
const [users, setUsers] = useState([]);

  const fetchData = async () => {
    const { data, error } = await supabase.from("profiles").select("*");

    setUsers(data);
  };

  useEffect(() => {
    fetchData();
  }, []);


}

export default EventsPage;