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
  const [isLoading, setIsLoading] = useState(true);

  const fetchUserData = async () => {
    const { data, error } = await supabase.from("profiles").select("*");
    setUsers(data);
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const getEvents = async () => {
    setIsLoading(true);
    const existingEventsBackend = await fetchData();

    if (existingEventsBackend.length > 0) {
      var validDateIndex = 0;
      while (validDateIndex < existingEventsBackend.length) {
        if (
          existingEventsBackend[validDateIndex].date <= new Date().toISOString()
        ) {
          var invalidEventId = existingEventsBackend[validDateIndex].id;
          await deleteFromSupabase(invalidEventId);
          validDateIndex++;
        } else {
          break;
        }
      }
      existingEventsBackend.splice(0, validDateIndex);
    }

    setAllEvents(existingEventsBackend);
    setIsLoading(false);
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

  const fetchJoinData = async () => {
    const { data: join, error } = await supabase
      .from("join")
      .select("eventid")
      // Filters
      .eq("userid", session.user.id);
    // console.log("fetching join data now");
    // console.log(join);
    return join;
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

  const [viewEventsOn, setViewEventsOn] = useState(false);
  const [myEvents, setMyEvents] = useState([]);

  const saveFilterDataHandler = (filterData) => {
    setViewEventsOn(false);
    setFilterOn(true);
    setFilterEventId(filterData.eventid);
    setFilterCategory(filterData.category);
    console.log("in savefilter handler");
    console.log(filterData);
  };

  const viewEventsHandler = async (userid) => {
    setIsLoading(true);
    //off the filter function since viewEvents is completely different
    setFilterOn(false);
    setViewEventsOn(true);
    console.log("in viewmyevents");
    const tempMyEvents = await fetchJoinData();
    console.log(tempMyEvents);
    const finalMyEvents = [];
    for (var i = 0; i < tempMyEvents.length; i++) {
      finalMyEvents.push(tempMyEvents[i].eventid);
    }
    console.log(finalMyEvents);
    setMyEvents(finalMyEvents);
    setIsLoading(false);
  };

  const deleteFromSupabase = async (id) => {
    const { data, error } = await supabase.from("events").delete().eq("id", id);
    console.log(error);
    console.log(id);
    //delete all data from join table as well:
    // console.log("hopefully deleting from supabase");
    //error 409:
    // const { data: join, error: err } = await supabase
    //   .from("join")
    //   .delete()
    //   .eq("eventid", id);
    // console.log("hopefully deleted from supabase");
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

  const viewMyEventsDataHandler = (viewMyEventsOn) => {
    console.log("executing child to parent data passing");
    console.log(viewMyEventsOn);
    setViewEventsOn(viewMyEventsOn);
  };

  return (
    <>
      <div style={{ padding: "10px 0 0 0" }}>
        <HeaderEvents session={session} />
        <div className="App">
          <ChatwootWidget />
        </div>
        <h2 className="welcome-outer"> Welcome to the events page! </h2>
        <NewEvent
          onAddEvent={addEventHandler}
          onSaveFilterData={saveFilterDataHandler}
          onViewMyEvents={viewEventsHandler}
          session={session}
          onPassViewMyEventsData={viewMyEventsDataHandler}
        />

        {filterOn &&
          !isLoading &&
          allEvents.filter((event) => {
            return filterEventId == ""
              ? filterCategory.includes(event.category)
              : event.id == filterEventId &&
                  filterCategory.includes(event.category);
          }).length == 0 && <div> No events found here.</div>}
        {!filterOn && !isLoading && allEvents.length == 0 && (
          <div> No events found.</div>
        )}
        {!viewEventsOn &&
          (isLoading ? (
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
          ))}
        {viewEventsOn && isLoading && <div>Loading... </div>}
        {viewEventsOn && !isLoading && myEvents.length == 0 && (
          <div> No events here. Register for one!</div>
        )}
        {viewEventsOn && !isLoading && myEvents.length > 0 && (
          <Grid
            id="viewEvents"
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            {allEvents
              .filter((event) => {
                // console.log(event.category);
                // console.log(event.id);
                // console.log(filterCategory.includes(event.category));
                return myEvents.includes(event.id);
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
