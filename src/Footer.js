import React, { Component } from "react";
import styled from "styled-components";
import { Typography } from "@material-ui/core";
import { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";

class Footer extends Component {
  render() {
    const onSignOut = async () => {
      const updateUsersOnlineFalse = async () => {
        try {
          console.log(this.props.session.user.id);
          const { error } = await supabase
            .from("profiles")
            .update({ userOnline: 0 }) // go to this column
            .eq("id", this.props.session.user.id);
          console.log("finish");
          console.log(error);

          // if (error) throw error;
        } catch (error) {
          console.log(error);
        }
      };
      await updateUsersOnlineFalse();
      supabase.auth.signOut();
      // add logic
      console.log(this.props.session);
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
  }
}

export default Footer;
