import React, { Component } from "react";
import styled from "styled-components";
import {Typography} from "@material-ui/core";
import { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";

class Footer extends Component {
  render() {
    return (
      <>
      {/* Sign out button */}
      <div className = "footer">

        <button
          className="button block"
          onClick={() => supabase.auth.signOut()}
        >
          Sign Out
        </button>
      </div>
      </>
    );
  }
}

export default Footer;