import React, { useState, useEffect } from "react";
import { supabase } from "../../supabaseClient";
import { Modal } from "react-bootstrap";
import classes from "./EventsItemModal.module.css";
import { BlueButton, GreenButton, RedButton } from "../Buttons/ColouredButtons";
import ChatContent from "./ChatContent";

export default function EventsChat(props) {
  const [backPressed, setBackPressed] = useState(false);
  const onClickBackHandler = () => {
    setBackPressed(true);
  };

  return (
    <div>
      <div className={classes.backdrop}></div>
      <div className={classes.modal}>
        <header
          className={classes.headerChat}
          style={{ color: "white" /*position:"fixed"*/ }}
        >
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
          style={{ padding: "20px 30px 20px 30px" }}
        >
          <ChatContent eventid={props.eventid} userid={props.userid} />
        </div>
        {/* <footer className={classes.actions}>
          <RedButton text="Submit" variant="contained"></RedButton>
        </footer> */}
      </div>
    </div>
  );
}
