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
            <div className="events-item-title">title: {props.title}</div>
            <div>date: {props.date}</div>
            <div>time (24-hour): {props.time.slice(0, 5)}</div>
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
              style={{ padding: "20px 0px 5px 30px" }}
            >
              <div>
                <strong>Description: </strong>
                <div style={{ padding: "0 100px 0 0" }}>
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
