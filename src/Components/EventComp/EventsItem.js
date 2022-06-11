import React from "react";
import "./EventsItem.css";

export default function EventsItem(props) {
  return (
    <>
      {console.log("hows life")}
      <div>{props.title}</div>
      <div>{props.id}</div>
      <div>{props.description}</div>
      <div>{props.date}</div>
    </>
  );
}
