import React, { useState, useEffect } from "react";
import { supabase } from "../../supabaseClient";
import { Modal } from "react-bootstrap";
import classes from "./EventsItemModal.module.css";
import { BlueButton, GreenButton, RedButton } from "../Buttons/ColouredButtons";
import ChatContent from "./ChatContent";
import { Form, InputGroup, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export default function EventsChat(props) {
  const [backPressed, setBackPressed] = useState(false);
  useEffect(() => {
    console.log("in events chat");
  });
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
        <div>
          <ChatContent eventid={props.eventid} userid={props.userid} />
        </div>
        {/* <footer className={classes.actions}> */}
        {/* <Form onSubmit={handleSubmit}>
        <Form.Group>
          <InputGroup style={{ padding: "5px 0 0 0" }}>
            <Form.Control
              as="textarea"
              required
              value={text}
              onChange={textInputHandler}
              style={{ height: "45px", resize: "none" }}
            />
            <RedButton
              type="submit"
              text="Submit"
              variant="contained"
            ></RedButton>
          </InputGroup>
        </Form.Group>
      </Form> */}
        {/* </footer> */}
      </div>
    </div>
  );
}
