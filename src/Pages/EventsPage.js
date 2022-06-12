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

  const addEventHandler = (event) => {
    // console.log(event);
    setAllEvents([...allEvents, event]);

    //add to backend
    // const { data, error } = await supabase.from('events').insert([
    //   { id: "hi", date:"bye", title:"hello", description:"event" },
    // ]);
  };

  const deleteFromSupabase = async (id) => {
    const { data: error } = await supabase.from("events").delete().eq("id", id);
  };

  const deleteItemHandler = (id) => {
    setAllEvents(allEvents.filter((event) => event.id != id));

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
            return (
              <EventsItem
                title={event.title}
                id={event.id}
                description={event.description}
                date={
                  typeof event.date == "string"
                    ? event.date
                    : event.date.toISOString()
                }
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
