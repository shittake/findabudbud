import React, { useState } from "react";
import { Auth, Typography, Button } from "@supabase/ui";
import TextField from "@mui/material/TextField";
import { supabase } from "./supabaseClient";
import {
  RedButton,
  BlueButton,
  GreenButton,
} from "./Components/Buttons/ColouredButtons";

export default function AdminLogInPage(props) {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log(email);
    console.log(password);

    try {
      setLoading(true);
      const { user, session, error } = await supabase.auth.signIn({
        email,
        password,
      });
      console.log(error);
      if (error) throw error;
    } catch (error) {
      setEmail("");
      setPassword("");
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  // const handleSignUp = async (e) => {
  //   try {
  //     setLoading(true);
  //     const { user, session, error } = await supabase.auth.signUp({
  //       email,
  //       password,
  //     });
  //     console.log(error);
  //     console.log(user);
  //     console.log(session);
  //     if (error) throw error;
  //     alert("Check your email for signup confirmation!");
  //   } catch (error) {
  //     alert(error.error_description || error.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <div>
      <BlueButton
        text="back"
        variant="contained"
        onClick={props.onClick}
      ></BlueButton>
      <form style={{ display: "flex", justifyContent: "center" }}>
        <div>
          <div style={{ padding: "30px" }}>
            <TextField
              margin="dense"
              size="small"
              required
              id="email-required"
              label="email"
              className="inputField"
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => {
                console.log(e.target.value);
                setEmail(e.target.value);
              }}
            />
            <TextField
              margin="dense"
              size="small"
              required
              id="password-required"
              label="password"
              className="inputField"
              type="password"
              placeholder="Your password"
              value={password}
              onChange={(e) => {
                console.log(e.target.value);
                setPassword(e.target.value);
              }}
            />
            <div style={{ padding: "20px 0 0 0" }}>
              <GreenButton
                text="sign in"
                type="submit"
                variant="contained"
                onClick={handleLogin}
              ></GreenButton>
            </div>
            {/* <div style={{ padding: "20px 0 0 0" }}>
              <RedButton
                text="sign up"
                type="submit"
                variant="contained"
                onClick={handleSignUp}
              ></RedButton>
            </div> */}
          </div>
        </div>
      </form>
    </div>
  );
}
