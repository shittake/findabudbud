import React from "react";

const Welcome = (props) => {
  return (
    <div className="welcome">
      Welcome to findabud{props.username ? ", " + props.username : ""}!!
    </div>
  );
};

export default Welcome;
