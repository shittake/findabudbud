import React from "react";
import "./NewEvent.css";
import EventForm from "./EventForm";
import { RedButton } from "../Buttons/ColouredButtons";

//add: created by user

function NewEvent(props) {
  const saveEnteredEventHandler = (eventFormData) => {
    const events = eventFormData;
    props.onAddEvent(events);
  };
  return (
    <>
      <EventForm onSaveEnteredEvent={saveEnteredEventHandler}></EventForm>
      <div className="new-event">
        <div>id</div>
        <div>title</div>
        <div>description</div>
        <div>date of event</div>
        <div>time of event</div>
        <div>created time</div>
        <div>button</div>
        <div>click on event</div>
      </div>
    </>
  );
}
export default NewEvent;
