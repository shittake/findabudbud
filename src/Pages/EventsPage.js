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

  const addEventHandler = async (event) => {
    setAllEvents([...allEvents, event]); //rerenders the entire thing

    //delete from backend
    const addToSupabase = async (event) => {
      const { data, error } = await supabase.from("events").insert([
        {
          id: event.id,
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
        },
      ]);
    };

    await addToSupabase(event);
  };

  const deleteFromSupabase = async (id) => {
    const { data: error } = await supabase.from("events").delete().eq("id", id);
  };

  const deleteItemHandler = (id) => {
    setAllEvents(
      allEvents.filter((event) => {
        event.id != id;
      })
    );
    //delete from backend
    deleteFromSupabase(id);
  };

  const session2 = supabase.auth.session();
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
            return (
              <EventsItem
                createdTime={
                  event.created_at ? event.created_at : new Date().toISOString()
                }
                key={event.id}
                title={event.title}
                id={event.id}
                description={event.description}
                date={
                  typeof event.date == "string"
                    ? event.date
                    : event.date.toISOString()
                }
                time={event.time}
                onDeleteItem={deleteItemHandler}
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
