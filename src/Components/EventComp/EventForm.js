import React, { useState } from "react";
import "./EventForm.css";

export default function EventForm(props) {
  const [enteredTitle, setEnteredTitle] = useState("");
  const [enteredId, setEnteredId] = useState(null);
  const [enteredDescription, setEnteredDescription] = useState("");
  const [enteredDate, setEnteredDate] = useState("");

  const titleChangeHandler = (event) => {
    setEnteredTitle(event.target.value);
  };
  const IdChangeHandler = (event) => {
    setEnteredId(event.target.value);
  };
  const decriptionChangeHandler = (event) => {
    setEnteredDescription(event.target.value);
  };
  const DateChangeHandler = (event) => {
    setEnteredDate(event.target.value);
  };

  const initialise = () => {
    setEnteredDate("");
    setEnteredTitle("");
    setEnteredDescription("");
    setEnteredId("");
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const eventData = {
      title: enteredTitle,
      id: enteredId,
      description: enteredDescription,
      date: new Date(enteredDate),
    };
    props.onSaveEnteredEvent(eventData);
    initialise();
  };

  return (
    <div>
      <form onSubmit={submitHandler}>
        <label>Title</label>
        <input
          type="text"
          value={enteredTitle}
          onChange={titleChangeHandler}
          id="title"
        />
        <label> Description </label>
        <input
          type="text"
          value={enteredDescription}
          onChange={decriptionChangeHandler}
          id="description"
        />
        <label>Date</label>
        <input
          type="date"
          value={enteredDate}
          min={new Date().toLocaleDateString("en-ca")}
          onChange={DateChangeHandler}
          id="date"
        />
        <label> id </label>
        <input
          type="number"
          value={enteredId}
          onChange={IdChangeHandler}
          id="id"
        />
        <button type="submit" className="event-button">
          Add event
        </button>
      </form>
    </div>
  );
}
