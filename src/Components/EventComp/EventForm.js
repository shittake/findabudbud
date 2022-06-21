import React, { useEffect, useState } from "react";
import "./EventForm.css";

export default function EventForm(props) {
  const [enteredTitle, setEnteredTitle] = useState("");
  const [enteredDescription, setEnteredDescription] = useState("");
  const [enteredDate, setEnteredDate] = useState("");
  const [enteredTime, setEnteredTime] = useState("");
  const [enteredNumPeople, setEnteredNumPeople] = useState("");

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

  const numPeopleChangeHandler = (event) => {
    setEnteredNumPeople(event.target.value);
  };

  const initialise = () => {
    setEnteredDate("");
    setEnteredTime("");
    setEnteredTitle("");
    setEnteredDescription("");
    setEnteredNumPeople("");
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const eventData = {
      title: enteredTitle,
      description: enteredDescription,
      date: new Date(enteredDate),
      time: enteredTime + ":00",
      numpeople: enteredNumPeople,
    };
    props.onSaveEnteredEvent(eventData);
    initialise();
  };

  return (
    <div className="event-form">
      <form onSubmit={submitHandler} className="event-form__controls">
        <div className="event-form__control">
          <label>Title: </label>{" "}
          <div>{20 - enteredTitle.length} characters left!</div>
          <input
            maxlength="20"
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
          <div>{1000 - enteredDescription.length} characters left!</div>
          <input
            maxlength="1000"
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
          <label>Time: </label>
          <input
            htmlFor="time"
            required
            type="time"
            value={enteredTime}
            onChange={TimeChangeHandler}
            id="time"
          />
        </div>
        <div className="event-form__control">
          <label>Number of people (including yourself!):</label>
          <input
            htmlFor="number"
            required
            type="number"
            value={enteredNumPeople}
            min="1"
            onChange={numPeopleChangeHandler}
            id="numpeople"
          />
        </div>

        <button type="submit" className="event-button">
          Add event
        </button>
      </form>
    </div>
  );
}
