import React, { useEffect, useState } from "react";
import "./EventForm.css";

export default function EventForm(props) {
  const [enteredTitle, setEnteredTitle] = useState("");
  const [enteredDescription, setEnteredDescription] = useState("");
  const [enteredDate, setEnteredDate] = useState("");
  const [enteredTime, setEnteredTime] = useState("");

  const titleChangeHandler = (event) => {
    setEnteredTitle(event.target.value);
  };

  const decriptionChangeHandler = (event) => {
    setEnteredDescription(event.target.value);
  };
  const DateChangeHandler = (event) => {
    setEnteredDate(event.target.value);
  };

  const TimeChangeHandler = (event) => {
    setEnteredTime(event.target.value);
  };

  const initialise = () => {
    setEnteredDate("");
    setEnteredTime("");
    setEnteredTitle("");
    setEnteredDescription("");
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const eventData = {
      title: enteredTitle,
      description: enteredDescription,
      date: new Date(enteredDate),
      time: enteredTime + ":00",
    };
    props.onSaveEnteredEvent(eventData);
    initialise();
  };

  return (
    <div className="event-form">
      <form onSubmit={submitHandler} className="event-form__controls">
        <div className="event-form__control">
          <label>Title: </label>
          <input
            htmlFor="title"
            required
            type="text"
            value={enteredTitle}
            onChange={titleChangeHandler}
            id="title"
          />
        </div>
        <div className="event-form__control">
          <label> Description: </label>
          <input
            htmlFor="description"
            required
            type="text"
            value={enteredDescription}
            onChange={decriptionChangeHandler}
            id="description"
          />
        </div>
        <div className="event-form__control">
          <label>Date:</label>
          <input
            htmlFor="date"
            required
            type="date"
            value={enteredDate}
            min={new Date().toLocaleDateString("en-ca")}
            onChange={DateChangeHandler}
            id="date"
          />
        </div>
        <div className="event-form__control">
          <label>Time:</label>
          <input
            htmlFor="time"
            required
            type="time"
            value={enteredTime}
            onChange={TimeChangeHandler}
            id="time"
          />
        </div>

        <button type="submit" className="event-button">
          Add event
        </button>
      </form>
    </div>
  );
}
