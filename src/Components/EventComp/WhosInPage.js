import React, { useState, useEffect, useRef } from "react";
import classes from "./EventsItemModal.module.css";
import { supabase } from "../../supabaseClient";
import "./EventsItem.css";
import { BlueButton } from "../Buttons/ColouredButtons";
import "bootstrap/dist/css/bootstrap.min.css";

export default function WhosInPage(props) {
  const [whosIn, setWhosIn] = useState([]);

  useEffect(() => {
    const fetchWhosInData = async () => {
      const { data: join, error } = await supabase
        .from("join")
        .select("userid")

        // Filters
        .eq("eventid", props.id);
      console.log(join);
      setWhosIn(join);
      return join;
    };
    fetchWhosInData();
  }, []);

  const number = useRef(0);

  return (
    <>
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
            who's in? - id {props.id}: {props.title}
          </div>
        </header>
        <div
          className={classes.content}
          style={{ padding: "20px 0px 30px 30px" }}
        >
          {whosIn.map((person, index) => {
            // {
            //   number.current += 1;
            // }
            return (
              <div>
                {index + 1} {": "}
                {person.userid}{" "}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
