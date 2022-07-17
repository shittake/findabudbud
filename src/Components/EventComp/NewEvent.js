import React, { useState } from "react";
import "./NewEvent.css";
import EventForm from "./EventForm";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { BlueButton, GreenButton, RedButton } from "../Buttons/ColouredButtons";

//add: created by user

function NewEvent(props) {
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };
  const [category, setCategory] = React.useState([]);
  const categorylist = ["Games", "Movies", "Sports", "Study", "Eat", "Others"];
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setCategory(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };
  const [eventId, setEventId] = useState("");

  const eventIdChangeHandler = (event) => {
    setEventId(event.target.value);
  };
  const saveEnteredEventHandler = (eventFormData) => {
    const events = eventFormData;
    props.onAddEvent(events);
  };

  const onClickFilterHandler = (event) => {
    const filterData = {
      category: category,
      eventid: eventId,
    };

    props.onSaveFilterData(filterData);
  };

  const onClickResetHandler = (event) => {
    setCategory(categorylist);
    const filterData = {
<<<<<<< HEAD
      category: categorylist, //not in time for async setCategory
=======
      category: categorylist, //async setCategory
>>>>>>> 1423bd3f6bf56479a1b308246769359daed36d7b
      eventid: eventId,
    };

    props.onSaveFilterData(filterData);
  };
  return (
    <>
      <EventForm onSaveEnteredEvent={saveEnteredEventHandler}></EventForm>
      <div className="new-event">
        <div>Filter by: </div>
        <FormControl sx={{ m: 1, width: 300 }}>
          <InputLabel id="demo-multiple-checkbox-label">Category</InputLabel>
          <Select
            labelId="demo-multiple-checkbox-label"
            id="demo-multiple-checkbox"
            multiple
            value={category}
            onChange={handleChange}
            input={<OutlinedInput label="Tag" />}
            renderValue={(selected) => selected.join(", ")}
            MenuProps={MenuProps}
          >
            {categorylist.map((cat) => (
              <MenuItem key={cat} value={cat}>
                <Checkbox checked={category.indexOf(cat) > -1} />
                <ListItemText primary={cat} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          type="number"
          id="event id"
          label="Event Id"
          onChange={eventIdChangeHandler}
          value={eventId}
        />
        <GreenButton
          type="submit"
          text="Filter Now!"
          variant="contained"
          onClick={onClickFilterHandler}
        ></GreenButton>
        <RedButton
          type="submit"
          text="Reset Filters!"
          variant="contained"
          onClick={onClickResetHandler}
        ></RedButton>
      </div>
    </>
  );
}
export default NewEvent;
