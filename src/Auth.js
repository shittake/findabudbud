import { useState } from "react";
import { supabase } from "./supabaseClient";
import logo from "./Images/FindabudLogo.png";
import TextField from "@mui/material/TextField";
import Popup from "./Popup";

export default function Auth() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const hoverClick = () => {
    setIsOpen(!isOpen);
  };

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
      <br></br>
      <div>
        <h1 style={{ background: "transparent" }}>
          <center>hello! you have arrived at findabud's login page :D</center>
        </h1>

        <h1 className="homepageimage">
          <img
            src={logo}
            class="centerimage"
            height="180"
            onClick={hoverClick}
            style={{ cursor: "pointer" }}
          />
        </h1>

        {isOpen && (
          <Popup
            content={
              <>
                <b>
                  <center> ABOUT US </center>
                </b>
                <br></br>
                <p>
                  {" "}
                  Findabud was created by Eric and Felicia to increase
                  opportunities for NUS students to make more like-minded
                  friends.{" "}
                </p>
                <p>
                  {" "}
                  You can contact us using the live chat feature on the bottom
                  right corner of your screen once you login.{" "}
                </p>
                <p>
                  {" "}
                  Alternatively, you can email us at e0406922@u.nus.edu (Eric)
                  or e0564015@u.nus.edu (Felicia).{" "}
                </p>
              </>
            }
            handleClose={hoverClick}
          />
        )}

        <p className="description">
          <center>
            <div className="auth-centralise-text">
              Key your personal email below and receive a unique login link!
            </div>
            <div>
              <strong>
                <u>
                  <em> DO NOT</em>
                </u>{" "}
              </strong>
              use your NUSNET email.
            </div>
          </center>
        </p>
        {loading ? (
          <div className="welcome-outer" style={{ padding: "25px 0 0 0" }}>
            <strong>"Sending magic link..."</strong>
          </div>
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
