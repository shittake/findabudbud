import React, { Component } from "react";
import styled from "styled-components";
import { Typography } from "@material-ui/core";
import { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";
import { Navigate, useNavigate } from "react-router-dom";

const Footer = ({ session }) => {
  const navigate = useNavigate();
  const onSignOut = async () => {
    const updateUsersOnlineFalse = async () => {
      try {
        console.log(session.user.id);
        const { error } = await supabase
          .from("profiles")
          .update({ userOnline: 0 }) // go to this column
          .eq("id", session.user.id);
        console.log("finish");
        console.log(error);

        // if (error) throw error;
      } catch (error) {
        console.log(error);
      }
    };
    await updateUsersOnlineFalse();
    supabase.auth.signOut();
    navigate("/");
    // add logic
    console.log(session);
  };
  return (
    <>
      {/* Sign out button */}
      <div className="footer">
        <button className="button block" onClick={onSignOut}>
          Sign Out
        </button>
      </div>
    </>
  );
};

export default Footer;
