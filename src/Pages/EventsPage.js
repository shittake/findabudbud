import { useState, useEffect } from "react";
import React from "react";
import Header from "../Header";
import Footer from "../Footer";
import ChatwootWidget from "../chatwoot.js";
import { supabase } from "../supabaseClient";
import { RedButton } from "../Components/Buttons/ColouredButtons";
import NewEvent from "../Components/EventComp/NewEvent";
import { textAlign } from "@mui/system";
import EventForm from "../Components/EventComp/EventForm";
import EventsItem from "../Components/EventComp/EventsItem";

const EventsPage = ({ session }) => {
  const [users, setUsers] = useState([]);

  const fetchUserData = async () => {
    const { data, error } = await supabase.from("profiles").select("*");
    setUsers(data);
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  useEffect(() => {
    const getEvents = async () => {
      const existingEventsBackend = await fetchData();
      setAllEvents(existingEventsBackend);
    };
    getEvents();
  }, []);
  const [allEvents, setAllEvents] = useState([]);
  const fetchData = async () => {
    const { data: events, error } = await supabase
      .from("events")
      .select("*")
      .order("date", { ascending: false });
    return events;
  };

  const subscribeToInserts = async () => {
    const subscribeEvents = supabase
      .from("events")
      .on("INSERT", (payload) => {
        console.log("Change received!", payload);
      })
      .subscribe();
  };
  const addEventHandler = async (event) => {
    setAllEvents([...allEvents, event]); //rerenders the entire thing

    //delete from backend
    const addToSupabase = async (event) => {
      console.log("add handler");
      console.log(event);
      const { data, error } = await supabase.from("events").insert([
        {
          //id: event.id, - when added supabase autogenerates
          date:
            typeof event.date == "string"
              ? event.date
              : event.date.toISOString(),
          title: event.title,
          description: event.description,
          time: event.time,
          created_at: event.created_at
            ? event.created_at
            : new Date().toISOString(),
          userid: session.user.id,
        },
      ]);
    };

    await addToSupabase(event);
    subscribeToInserts();
  };

  const deleteFromSupabase = async (id) => {
    const { data: error } = await supabase.from("events").delete().eq("id", id);
  };

  const deleteItemHandler = (id) => {
    setAllEvents(
      allEvents.filter(
        (event) => event.id != id && session.user.id != event.userid
      )
    );
    //delete from backend
    deleteFromSupabase(id);
  };

  return (
    <>
      <div>
        <Header session={session} />

        <div className="App">
          <ChatwootWidget />
        </div>

        <h2 className="welcome-outer"> Welcome to the events page! </h2>
        <NewEvent onAddEvent={addEventHandler} />
        {allEvents.length == 0 && <div> No events found.</div>}
        {allEvents.length > 0 &&
          allEvents.map((event) => {
            console.log(event);
            return (
              <EventsItem
                createdTime={
                  event.created_at ? event.created_at : new Date().toISOString()
                }
                key={event.id ? event.id : "5"} //realtime subscription
                title={event.title}
                id={event.id ? event.id : "5"} //realtime subscription
                description={event.description}
                date={
                  typeof event.date == "string"
                    ? event.date
                    : event.date.toISOString()
                }
                time={event.time}
                onDeleteItem={deleteItemHandler}
                session={session}
                useridcreator={event.userid ? event.userid : session.user.id}
              ></EventsItem>
            );
          })}
      </div>

      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <Footer />
    </>
  );
};

export default EventsPage;
