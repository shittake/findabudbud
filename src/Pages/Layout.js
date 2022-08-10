import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../NavBar";

const Layout = (props) => {
  const [teleHandle, setTeleHandle] = useState();
  const viewTeleAlert = (input) => {
    console.log("in view tele alert");
    console.log(input);
    setTeleHandle(input);
    props.onViewTeleAlert(input);
  };

  return (
    <>
      <NavBar session={props.session} onViewTeleAlert={viewTeleAlert} />
      <Outlet />
    </>
  );
};

export default Layout;
