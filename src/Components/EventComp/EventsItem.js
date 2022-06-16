// import { PanSession } from "framer-motion/types/gestures/PanSession";
import React, { useState } from "react";
import { supabase } from "../../supabaseClient";
import { BlueButton, GreenButton, RedButton } from "../Buttons/ColouredButtons";
import classes from "./EventsItemModal.module.css";
import "./EventsItem.css";

export default function EventsItem(props) {
  const [buttonPressed, setButtonPressed] = useState(false);

  const onClickHandler = () => {
    setButtonPressed(!buttonPressed);
  };
  return (
    <>
      {!buttonPressed && (
        <div>
          <div className="events-item" style={{ padding: "20px 0 0 0" }}>
            <div>id: {props.id}</div>
            <div>title: {props.title}</div>
            {/* <div>{props.description}</div> */}
            <div>date: {props.date}</div>
            <div>time: {props.time}</div>
            {/* <div>{props.createdTime}</div> */}
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
                <RedButton
                  text="View This Event"
                  variant="contained"
                  onClick={onClickHandler}
                ></RedButton>
              </div>
            </div>
          </div>
        </div>
      )}
      {buttonPressed && (
        <div>
          <div className={classes.backdrop}></div>
          <div className={classes.modal}>
            <header className={classes.header} style={{ color: "white" }}>
              <h2>id: {props.id}</h2>
              <h2>title: {props.title}</h2>
            </header>
            <div
              className={classes.content}
              style={{ padding: "20px 0 5px 30px" }}
            >
              <div>Description: {props.description}</div>
              <div>Date: {props.date}</div>
              <div>
                Time of event (24-hour format): {props.time.slice(0, 5)}
              </div>
              <div>
                Created Date, Time: {props.createdTime.slice(0, 10)}
                {", "}
                {props.createdTime.slice(11, 16)}
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
