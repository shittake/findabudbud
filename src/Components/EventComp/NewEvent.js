import React from "react";
import "./NewEvent.css";
import EventForm from "./EventForm";

function NewEvent(props) {
  const saveEnteredEventHandler = (eventFormData) => {
    const events = eventFormData;
    props.onAddEvent(events);
  };
  return (
    <>
      <div className="new-event">
        <div>id</div>
        <div>title</div>
        <div>date</div>
        <div>description</div>
      </div>
      <EventForm onSaveEnteredEvent={saveEnteredEventHandler}></EventForm>
    </>
  );
}
export default NewEvent;
