import React from "react";
import "./EventsItem.css";

export default function EventsItem(props) {
  return (
    <>
      <div className="events-item">
        <div>{props.id}</div>
        <div>{props.title}</div>
        <div>{props.description}</div>
        <div>{props.date}</div>
        <div>{props.time ? props.time : "null"}</div>
        <div>{props.createdTime}</div>
        <button
          onClick={() => {
            props.onDeleteItem(props.id);
          }}
        >
          x
        </button>
      </div>
    </>
  );
}
