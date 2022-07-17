import { useState, useEffect } from "react";
import React from "react";
import HeaderEvents from "../Components/Header/HeaderEvents";
import Footer from "../Footer";
import ChatwootWidget from "../chatwoot.js";
import { supabase } from "../supabaseClient";
import { RedButton } from "../Components/Buttons/ColouredButtons";
import NewEvent from "../Components/EventComp/NewEvent";
import { textAlign } from "@mui/system";
import EventForm from "../Components/EventComp/EventForm";
import EventsItem from "../Components/EventComp/EventsItem";
import Grid from "@mui/material/Grid";
import { FormControlUnstyledContext } from "@mui/base";

const EventsPage = ({ session }) => {
  const [users, setUsers] = useState([]);
  const [allEvents, setAllEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchUserData = async () => {
    const { data, error } = await supabase.from("profiles").select("*");
    setUsers(data);
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const getEvents = async () => {
    const existingEventsBackend = await fetchData();

    if (existingEventsBackend.length > 0) {
      var validDateIndex = 0;
      while (validDateIndex < existingEventsBackend.length) {
        if (
          existingEventsBackend[validDateIndex].date <= new Date().toISOString()
        ) {
          var invalidEventId = existingEventsBackend[validDateIndex].id;
          deleteFromSupabase(invalidEventId);
          validDateIndex++;
        } else {
          break;
        }
      }
      existingEventsBackend.splice(0, validDateIndex);
    }

    setAllEvents(existingEventsBackend);
  };
  useEffect(() => {
    getEvents();
  }, []);

  const fetchData = async () => {
    const { data: events, error } = await supabase
      .from("events")
      .select("*")
      .order("date", { ascending: true });
    return events;
  };

  //delete from backend
  const addToSupabase = async (event) => {
    setIsLoading(true);
    const { data, error } = await supabase.from("events").insert([
      {
        //id: event.id, - when added supabase autogenerates
        date:
          typeof event.date == "string" ? event.date : event.date.toISOString(),
        title: event.title,
        description: event.description,
        time: event.time,
        created_at: event.created_at
          ? event.created_at
          : new Date().toISOString(),
        userid: session.user.id,
        numpeople: event.numpeople,
        category: event.category,
      },
    ]);
    setIsLoading(false);
    return data;
  };

  const addEventHandler = async (event) => {
    const newEvent = await addToSupabase(event);
    // console.log("new event");
    // console.log(newEvent);
    getEvents();
    // setAllEvents([...allEvents, ...newEvent]);
    // subscribeToInserts();
  };

  const [filterOn, setFilterOn] = useState(false);
  const [filterEventId, setFilterEventId] = useState("");
  const [filterCategory, setFilterCategory] = useState([]);

  const saveFilterDataHandler = (filterData) => {
    setFilterOn(true);
    setFilterEventId(filterData.eventid);
    setFilterCategory(filterData.category);
    console.log("in savefilter handler");
    console.log(filterData);
  };

  const deleteFromSupabase = async (id) => {
    const { data: error } = await supabase.from("events").delete().eq("id", id);
  };

  const deleteItemHandler = (id) => {
    setAllEvents(
      allEvents.filter((event) => {
        return event.id !== id || session.user.id !== event.userid;
      })
    );
    //delete from backend
    deleteFromSupabase(id);
  };

  return (
    <>
      <div>
        <HeaderEvents session={session} />
        <div className="App">
          <ChatwootWidget />
        </div>
        <h2 className="welcome-outer"> Welcome to the events page! </h2>
        <NewEvent
          onAddEvent={addEventHandler}
          onSaveFilterData={saveFilterDataHandler}
        />
        {filterOn &&
          allEvents.filter((event) => {
            return filterEventId == ""
              ? filterCategory.includes(event.category)
              : event.id == filterEventId &&
                  filterCategory.includes(event.category);
          }).length == 0 && <div> No events found here.</div>}
        {!filterOn && allEvents.length == 0 && <div> No events found.</div>}
        {isLoading ? (
          <div>Loading...</div>
        ) : filterOn ? (
          <Grid
            id="filter"
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            {allEvents
              .filter((event) => {
                // console.log(event.category);
                // console.log(event.id);
                // console.log(filterCategory.includes(event.category));
                return filterEventId == ""
                  ? filterCategory.includes(event.category)
                  : event.id == filterEventId &&
                      filterCategory.includes(event.category);
              })
              .map((event) => {
                return (
                  <Grid item xs={6} key={event.id}>
                    <EventsItem
                      createdTime={
                        event.created_at
                          ? event.created_at
                          : new Date().toISOString()
                      }
                      // key={event.id} //realtime subscription
                      title={event.title}
                      id={event.id} //realtime subscription
                      description={event.description}
                      date={event.date}
                      time={event.time}
                      onDeleteItem={deleteItemHandler}
                      session={session}
                      useridcreator={
                        event.userid ? event.userid : session.user.id
                      }
                      numpeople={event.numpeople}
                      currentnumpeople={event.currentnumpeople}
                      isInterested={false}
                      category={event.category}
                    ></EventsItem>
                  </Grid>
                );
              })}
          </Grid>
        ) : (
          <Grid
            id="all"
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            {allEvents.map((event) => {
              return (
                <Grid item xs={6} key={event.id}>
                  <EventsItem
                    createdTime={
                      event.created_at
                        ? event.created_at
                        : new Date().toISOString()
                    }
                    // key={event.id} //realtime subscription
                    title={event.title}
                    id={event.id} //realtime subscription
                    description={event.description}
                    date={event.date}
                    time={event.time}
                    onDeleteItem={deleteItemHandler}
                    session={session}
                    useridcreator={
                      event.userid ? event.userid : session.user.id
                    }
                    numpeople={event.numpeople}
                    currentnumpeople={event.currentnumpeople}
                    isInterested={false}
                    category={event.category}
                  ></EventsItem>
                </Grid>
              );
            })}
          </Grid>
        )}
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
