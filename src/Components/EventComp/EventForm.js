import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import "./EventForm.css";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const useStyles = makeStyles((theme) => {
  return {
    root: {
      height: "40px",
    },
    categoryPadding: {
      padding: "0.5rem 0 0 0",
    },
  };
});

export default function EventForm(props) {
  const classes = useStyles();
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
    setCategory("Games");
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const eventData = {
      title: enteredTitle,
      description: enteredDescription,
      date: new Date(enteredDate),
      time: enteredTime + ":00",
      numpeople: enteredNumPeople,
      category: category,
    };
    props.onSaveEnteredEvent(eventData);
    initialise();
  };

  const [category, setCategory] = useState("Games");

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  return (
    <div id="form" className="event-form">
      <form onSubmit={submitHandler} className="event-form__controls">
        <div className="event-form__control">
          <label>Title: </label>
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
            max="100"
            onChange={numPeopleChangeHandler}
            id="numpeople"
          />
        </div>
        <div>
          <label className="category-label">
            <b>Category:</b>
          </label>
          <Box className={classes.categoryPadding}>
            <FormControl
              sx={{
                width: 97 / 100,
                bgcolor: "background.paper",
                borderRadius: "12px",
              }}
            >
              <InputLabel></InputLabel>
              <Select
                value={category}
                label="category"
                onChange={handleCategoryChange}
                className={classes.root}
              >
                <MenuItem value="Games">Games</MenuItem>
                <MenuItem value="Movies">Movies</MenuItem>
                <MenuItem value="Sports">Sports</MenuItem>
                <MenuItem value="Study">Study</MenuItem>
                <MenuItem value="Eat">Eat</MenuItem>
                <MenuItem value="Others">Others</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </div>
        <button type="submit" className="event-form-button">
          Add event
        </button>
      </form>
    </div>
  );
}
