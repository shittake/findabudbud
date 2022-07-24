import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../NavBar";

const Layout = ({ session }) => {
  return (
    <>
      <NavBar session={session} />
      <Outlet />
    </>
  );
};

export default Layout;
