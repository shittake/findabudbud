import React, { useState, useEffect } from "react";
import { supabase } from "../../supabaseClient";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, InputGroup, Button } from "react-bootstrap";
import { Input } from "@material-ui/core";
import { StepContext } from "@mui/material";
import { BlueButton, RedButton } from "../Buttons/ColouredButtons";

export default function ChatContent() {
  const [text, setText] = useState("");
  return (
    <div className="d-flex flex-column flex-grow-1">
      <div className="flex-grow-1 overflow-auto"></div>
      <Form>
        <Form.Group>
          <InputGroup>
            <Form.Control
              as="textarea"
              required
              value={text}
              onChange={(e) => setText(e.target.value)}
              style={{ height: "45px", resize: "none" }}
            />
            <RedButton text="Submit" variant="contained"></RedButton>
          </InputGroup>
        </Form.Group>
      </Form>
    </div>
  );
}
