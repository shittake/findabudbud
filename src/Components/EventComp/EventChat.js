import React, { useState, useEffect } from "react";
import { supabase } from "../../supabaseClient";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal } from "react-bootstrap";
import classes from "./EventsItemModal.module.css";
import { BlueButton, RedButton } from "../Buttons/ColouredButtons";

export default function EventsChat(props) {
  const [backPressed, setBackPressed] = useState(false);
  const onClickBackHandler = () => {
    setBackPressed(true);
  };
  return (
    <div>
      <div className={classes.backdrop}></div>
      <div className={classes.modal}>
        <header className={classes.headerChat} style={{ color: "white" }}>
          <BlueButton
            text="Back"
            variant="contained"
            onClick={props.onClick}
          ></BlueButton>

          <div
            style={{
              padding: "0 0 0 30px",
              fontSize: "24px",
              // fontWeight: "bold",
            }}
          >
            chat - id {props.eventid}: {props.eventtitle}
          </div>
        </header>
        <div
          className={classes.content}
          style={{ padding: "20px 0px 5px 30px" }}
        >
          <div> middle </div>
        </div>
        <footer className={classes.actions}>
          <RedButton text="Submit" variant="contained"></RedButton>
        </footer>
      </div>
    </div>
  );
}
