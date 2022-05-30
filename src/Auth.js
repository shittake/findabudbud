import { useState } from "react";
import { supabase } from "./supabaseClient";

import FormPropsTextFields from "./Components/UI/DefaultTextInput";
import TextField from "@mui/material/TextField";

export default function Auth() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log(email);

    try {
      setLoading(true);
      const { error } = await supabase.auth.signIn({ email });
      if (error) throw error;
      alert("Check your email for the login link!");
    } catch (error) {
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-formatting">
      <div>
        <h1 className="header">
          <center>hello! you have arrived at findabud's login page :D</center>
        </h1>
        <p className="description">
          <center>
            <div className="auth-centralise-text">
              Key your personal email below and receive a unique login link!
            </div>
            <div>
              <strong>
                <u>
                  <em> DO NOT </em>
                </u>
              </strong>
              use your NUSNET email.
            </div>
          </center>
        </p>
        {loading ? (
          "Sending magic link..."
        ) : (
          <form
            onSubmit={handleLogin}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <div className="auth-email-formatting">
              <div style={{ padding: "30px" }}>
                <TextField
                  margin="dense"
                  size="small"
                  // inputProps={{ sx: { height: 10 } }}
                  required
                  id="outlined-required"
                  label="Required"
                  // defaultValue="Hello World"
                  className="inputField"
                  type="email"
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => {
                    console.log(e.target.value);
                    setEmail(e.target.value);
                  }}
                />
              </div>
              <div style={{ padding: "22.5px" }}>
                <button className="button block" aria-live="polite">
                  Send magic link
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
