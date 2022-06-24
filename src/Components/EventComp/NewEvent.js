import React from "react";
import "./NewEvent.css";
import EventForm from "./EventForm";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";

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
  const categorylist = ["None", "Games", "Movies", "Sports", "Study", "Eat"];
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setCategory(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };
  const saveEnteredEventHandler = (eventFormData) => {
    const events = eventFormData;
    props.onAddEvent(events);
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
      </div>
    </>
  );
}
export default NewEvent;
