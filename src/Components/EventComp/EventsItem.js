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
          <div className="events-item">
            <div>{props.id}</div>
            <div>{props.title}</div>
            <div>{props.description}</div>
            <div>{props.date}</div>
            <div>{props.time}</div>
            <div>{props.createdTime}</div>
            {props.session.user.id == props.useridcreator && ( //real time
              <RedButton
                onClick={() => {
                  props.onDeleteItem(props.id);
                }}
                text="Delete Event"
                variant="contained"
              ></RedButton>
            )}
            <RedButton
              text="View This Event"
              variant="contained"
              onClick={onClickHandler}
            ></RedButton>
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
            <div className={classes.content}>
              <div>Description: {props.description}</div>
              <div>Date: {props.date}</div>
              <div>Time: {props.time}</div>
              <div>Created Time: {props.createdTime}</div>
            </div>
            <footer className={classes.actions}>
              {props.session.user.id == props.useridcreator && ( //real time
                <RedButton
                  onClick={() => {
                    props.onDeleteItem(props.id);
                  }}
                  text="Delete Event"
                  variant="contained"
                ></RedButton>
              )}
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
