import React, { useState, useEffect, useCallback, useRef } from "react";
import { supabase } from "../../supabaseClient";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, InputGroup, Button } from "react-bootstrap";
import { Input } from "@material-ui/core";
import { StepContext } from "@mui/material";
import { BlueButton, RedButton } from "../Buttons/ColouredButtons";

export default function ChatContent(props) {
  const [text, setText] = useState("");
  const lastMessageRef = useRef();
  const [allMessages, setAllMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [displayUsername, setDisplayUsername] = useState("");

  const fetchAllMessages = useCallback(async () => {
    let { data: eventsmessages, error } = await supabase
      .from("eventsmessages")
      .select("*")
      .eq("eventid", props.eventid)
      .order("createdAt", { ascending: true });
    setAllMessages(eventsmessages);
  }, []);

  useEffect(() => {
    fetchAllMessages();
    console.log("hello");
  }, []);

  useEffect(() => {
    console.log("in");
    const mySubscription = supabase
      .from("*")
      .on("*", (payload) => {
        console.log("Change received!", payload);
      })
      .subscribe();
    return () => {
      supabase.removeSubscription(mySubscription);
    };
  }, []);

  const textInputHandler = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("submitted");
    if (text.trim().length === 0) {
      setText("");
      alert("enter valid message before submitting!");
      return;
    }
    const newMessage = await addToSupabase(text);
    setText("");
    console.log("does it rerender upon submit");
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
    return data;
  };

  const setRef = useCallback((node) => {
    if (node) {
      node.scrollIntoView({ smooth: true });
    }
  }, []);
  // useEffect(() => {
  //   if (lastMessageRef.current) {
  //     lastMessageRef.current.scrollIntoView({ smooth: true });
  //   }
  // },[]);

  const fetchUsername = async (sentuserid) => {
    let { data: profiles, error } = await supabase
      .from("profiles")
      .select("username")
      .eq("id", sentuserid);
    return profiles;
  };

  return (
    <div className="d-flex flex-column flex-grow-1">
      <div className="flex-grow-1 overflow-auto">
        {console.log(allMessages)}
        <div className="h-100 d-flex flex-column align-items-start justify-content-end">
          {allMessages.map((message) => {
            const lastMessage = allMessages.length - 1 === message.index;
            const input = message.userid;
            const username = async (input) => {
              const result = await fetchUsername(input);
              return result;
            };

            return (
              <div
                ref={lastMessage ? setRef : null}
                key={message.id}
                className={`my-1 d-flex flex-column ${
                  message.userid === props.userid ? "align-self-end" : ""
                }`}
              >
                <div
                  className={`rounded px-2 py-1 ${
                    message.userid === props.userid
                      ? "bg-primary text-white"
                      : "border"
                  }`}
                >
                  {message.content}
                </div>
                <div
                  className={`text-muted small ${
                    message.userid === props.userid ? "align-self-end" : ""
                  }`}
                >
                  {
                    message.userid === props.userid
                      ? "You"
                      : message.userid /*await username(input)*/
                  }
                </div>
              </div>
            );
          })}
        </div>
      </div>
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
