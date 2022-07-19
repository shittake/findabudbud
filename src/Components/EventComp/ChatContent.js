import React, { useState, useEffect } from "react";
import { supabase } from "../../supabaseClient";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, InputGroup, Button } from "react-bootstrap";
import { Input } from "@material-ui/core";
import { StepContext } from "@mui/material";
import { BlueButton, RedButton } from "../Buttons/ColouredButtons";

export default function ChatContent(props) {
  const [text, setText] = useState("");

  const textInputHandler = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("submitted");
    const newMessage = await addToSupabase(text);
    setText("");
  };
  const addToSupabase = async (text) => {
    const { data, error } = await supabase.from("eventsmessages").insert([
      {
        eventid: props.eventid,
        userid: props.userid,
        content: text,
        createdAt: new Date().toISOString(),
      },
    ]);
    console.log(error);
    return data;
  };
  return (
    <div className="d-flex flex-column flex-grow-1">
      <div className="flex-grow-1 overflow-auto"></div>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <InputGroup>
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
      </Form>
    </div>
  );
}
