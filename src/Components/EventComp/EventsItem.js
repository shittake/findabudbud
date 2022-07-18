// import { PanSession } from "framer-motion/types/gestures/PanSession";
import React, { useState, useEffect } from "react";
import { supabase } from "../../supabaseClient";
import { BlueButton, GreenButton, RedButton } from "../Buttons/ColouredButtons";
import classes from "./EventsItemModal.module.css";
import "./EventsItem.css";
import useUpdateEffect from "../../Hooks/useUpdateEffect";
import { color } from "@mui/system";

export default function EventsItem(props) {
  const [buttonPressed, setButtonPressed] = useState(false);
  const [currentNumPeople, setCurrentNumPeople] = useState(0); //the person who created the event
  const [interestedButtonPressed, setInterestedButtonPressed] = useState(false); //TODO: props.isInterested

  const fetchEventData = async () => {
    const { data, error } = await supabase
      .from("events")
      .select("currentnumpeople")
      .eq("id", props.id);
    setCurrentNumPeople(data[0].currentnumpeople);
  };

  useEffect(() => {
    fetchEventData();
  }, []);

  useUpdateEffect(() => {
    const updateCurrentNumPeople = async () => {
      const { data, error } = await supabase
        .from("events")
        .update({ currentnumpeople: currentNumPeople })
        .match({ id: props.id });
    };
    updateCurrentNumPeople();
  }, [currentNumPeople]);

  const currentnumpeopleClickHandler = () => {
    if (!interestedButtonPressed && currentNumPeople == props.numpeople) {
      return; //error because exceeded people capacity
    }
    setInterestedButtonPressed(!interestedButtonPressed);
    if (interestedButtonPressed) {
      setCurrentNumPeople((prevnum) => prevnum - 1);
      deleteJoinRowHandler();
    } else {
      setCurrentNumPeople((prevnum) => prevnum + 1);
      insertJoinRowHandler();
    }
  };

  const deleteJoinRowHandler = async () => {
    console.log("going to delete");
    const { data, error } = await supabase
      .from("join")
      .delete()
      .eq("eventid", props.id)
      .eq("userid", props.session.user.id);
  };
  const insertJoinRowHandler = async () => {
    console.log(props.id);
    console.log(props.session.user.id);
    const { data, error } = await supabase
      .from("join")
      .insert([{ eventid: props.id, userid: props.session.user.id }]);
  };

  const onClickHandler = () => {
    setButtonPressed(!buttonPressed);
    // console.log("im clicked");
  };

  let categoryColor = "#C3B7FF"; //Others
  if (props.category == "Games") {
    categoryColor = "#F98E86";
  } else if (props.category == "Movies") {
    categoryColor = "#FFC464";
  } else if (props.category == "Sports") {
    categoryColor = "#8AE7C2";
  } else if (props.category == "Eat") {
    categoryColor = "#87E779";
  } else if (props.category == "Study") {
    categoryColor = "#86E1F9";
  }

  return (
    <>
      {!buttonPressed && (
        <div onClick={onClickHandler}>
          <div
            className="events-item"
            style={{ padding: "20px 0 0 0", backgroundColor: categoryColor }}
          >
            <div>id: {props.id}</div>
            <div className="events-item-title">title: {props.title}</div>
            <div>date: {props.date}</div>
            <div>time (24-hour): {props.time.slice(0, 5)}</div>
            <div>Category: {props.category}</div>
            <div className="event-footer">
              <div style={{ padding: "0 10px 0 10px" }}>
                {props.session.user.id == props.useridcreator ? ( //real time
                  <RedButton
                    onClick={() => {
                      props.onDeleteItem(props.id);
                    }}
                    text="Delete Event"
                    variant="contained"
                  ></RedButton>
                ) : (
                  ""
                )}
              </div>
              <div>
                {/* <RedButton
                  text="View This Event"
                  variant="contained"
                  onClick={onClickHandler}
                ></RedButton> */}
              </div>
            </div>
          </div>
        </div>
      )}
      {buttonPressed && (
        <div>
          <div className={classes.backdrop} onClick={onClickHandler}></div>
          <div className={classes.modal}>
            <header className={classes.header} style={{ color: "white" }}>
              <h2>id: {props.id}</h2>
              <h2>title: {props.title}</h2>
            </header>
            <div
              className={classes.content}
              style={{ padding: "20px 0px 5px 30px" }}
            >
              <div>
                <strong>Description: </strong>
                <div
                  style={{ padding: "0 100px 0 0" }}
                  className={classes.eventsdescriptionbox}
                >
                  {props.description}
                </div>
              </div>
              <div>
                <strong>Date: </strong>
                {props.date}
              </div>
              <div>
                <strong>Time of event (24-hour format): </strong>
                {props.time.slice(0, 5)}
              </div>
              <div>
                <strong>Created Date, Time: </strong>
                {props.createdTime.slice(0, 10)}
                {", "}
                {props.createdTime.slice(11, 16)}
              </div>
              <div>
                <strong>Number of people: </strong>
                <div>
                  {currentNumPeople}/{props.numpeople}
                </div>
              </div>
              <div>
                <strong>Category: </strong>
                {props.category}
              </div>
            </div>
            <footer className={classes.actions}>
              <div style={{ padding: "0 10px" }}>
                {props.session.user.id == props.useridcreator && ( //real time
                  <RedButton
                    onClick={() => {
                      props.onDeleteItem(props.id);
                    }}
                    text="Delete Event"
                    variant="contained"
                  ></RedButton>
                )}
              </div>
              <RedButton
                text={interestedButtonPressed ? "interested" : "not interested"}
                variant={interestedButtonPressed ? "contained" : "outlined"}
                onClick={currentnumpeopleClickHandler}
              ></RedButton>
              <RedButton
                text="View other events"
                variant="contained"
                onClick={onClickHandler}
              ></RedButton>
            </footer>
          </div>
        </div>
      )}
    </>
  );
}
