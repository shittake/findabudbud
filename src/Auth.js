import { useState } from "react";
import { supabase } from "./supabaseClient";
import logo from "./Images/FindabudLogo.png";
import TextField from "@mui/material/TextField";
import Popup from "./Popup";
import { BlueButton } from "./Components/Buttons/ColouredButtons";
import AdminLogInPage from "./AdminLogInPage";

export default function Auth() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [adminLogIn, setAdminLogIn] = useState(false);

  const hoverClick = () => {
    setIsOpen(!isOpen);
  };

  const adminLogInHandler = () => {
    setAdminLogIn(true);
  };

  const closeAdminLogInHandler = () => {
    setAdminLogIn(false);
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
    <div className="login-container">
      <div className="auth-formatting">
        <br></br>
        <div>
          <h1
            style={{
              background: "transparent",
              fontFamily: "Comic Sans MS",
              fontSize: "36px",
            }}
          >
            <center>Hello! You have arrived at FindABud's login page 😀</center>
          </h1>
          <br />

          <h1 className="homepageimage">
            <img
              src={logo}
              className="centerimage"
              height="220"
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
                    Findabud was created by Eric and Felicia to increase
                    opportunities for NUS students to make more like-minded
                    friends.
                  </p>
                  <p>
                    You can contact us using the live chat feature on the bottom
                    right corner of your screen once you login.
                  </p>
                  <p>
                    Alternatively, you can email us at e0406922@u.nus.edu (Eric)
                    or e0564015@u.nus.edu (Felicia).
                  </p>
                </>
              }
              handleClose={hoverClick}
            />
          )}

          <div className="description" style={{ padding: "10px 0 10px 0" }}>
            <center>
              <div className="auth-centralise-text">
                Create an account with us or login with your email below!
              </div>
            </center>
          </div>

          {loading ? (
            <div className="welcome-outer" style={{ padding: "25px 0 0 0" }}>
              <strong>"Sending magic link..."</strong>
            </div>
          ) : (
            <form
              onSubmit={handleLogin}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <div
                className={
                  isOpen ? "dark-email-formatting" : "auth-email-formatting"
                }
              >
                <div style={{ padding: "30px" }}>
                  <TextField
                    margin="dense"
                    size="small"
                    // inputProps={{ sx: { height: 10 } }}
                    required
                    id="outlined-required"
                    label="Email"
                    // defaultValue="Hello World"
                    className="inputField"
                    type="email"
                    placeholder="Your email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                </div>
                <div style={{ padding: "10px" }}>
                  <button className="button block" aria-live="polite">
                    Send magic link
                  </button>
                </div>
              </div>
            </form>
          )}
          <div
            style={{
              padding: "40px 0 0 0",
              display: "flex",
              justifyContent: "center",
            }}
          >
            {!adminLogIn && (
              <BlueButton
                text="Admin Sign In"
                variant="contained"
                onClick={adminLogInHandler}
              ></BlueButton>
            )}
            {adminLogIn && (
              <AdminLogInPage onClick={closeAdminLogInHandler}></AdminLogInPage>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
