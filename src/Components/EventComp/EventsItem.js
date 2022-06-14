// import { PanSession } from "framer-motion/types/gestures/PanSession";
import React from "react";
import { supabase } from "../../supabaseClient";

import "./EventsItem.css";

export default function EventsItem(props) {
  return (
    <>
      <div className="events-item">
        <div>{props.id}</div>
        <div>{props.title}</div>
        <div>{props.description}</div>
        <div>{props.date}</div>
        <div>{props.time}</div>
        <div>{props.createdTime}</div>
        {props.session.user.id == props.useridcreator && (
          <button
            onClick={() => {
              props.onDeleteItem(props.id);
            }}
          >
            x
          </button>
        )}
      </div>
    </>
  );
}
