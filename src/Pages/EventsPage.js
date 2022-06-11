import { useState, useEffect } from "react";
import React from "react";
import { supabase } from "../supabaseClient";
import { RedButton } from "../Components/Buttons/ColouredButtons";
import NewEvent from "../Components/EventComp/NewEvent";
import { textAlign } from "@mui/system";
import EventForm from "../Components/EventComp/EventForm";
import EventsItem from "../Components/EventComp/EventsItem";

const EventsPage = ({ session }) => {
  const fetchData = async () => {
    const { data, error } = await supabase.from("profiles").select("*");
    // setUsers(data);
  };

  // useEffect(() => {
  //   fetchData();
  // }, []);

  const dummyevent = [
    {
      id: "1",
      title: "Event 1",
      description: "hi im event 1",
      date: new Date(2020, 7, 14),
    },
    {
      id: "2",
      title: "Event 2",
      description: "hi im event 2",
      date: new Date(2021, 2, 12),
    },
    {
      id: "3",
      title: "Event 3",
      description: "hi im event 3",
      date: new Date(2021, 2, 28),
    },
  ];

  // const [allEvents, setAllEvents] = useState(dummyevent); //initially at the top

  const addEventHandler = (event) => {
    console.log(event);
  };

  return (
    <>
      <div>
        <h2 className="welcome-outer"> Welcome to the events page! </h2>

        {dummyevent.map((event) => {
          return (
            <EventsItem
              title={event.title}
              id={event.id}
              description={event.description}
              date={event.date.toISOString()}
            ></EventsItem>
          );
        })}

        <NewEvent onAddEvent={addEventHandler} />
      </div>
    </>
  );
};

export default EventsPage;
