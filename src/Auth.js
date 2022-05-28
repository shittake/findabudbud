import { useState } from "react";
import { supabase } from "./supabaseClient";

export default function Auth() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

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
          <form onSubmit={handleLogin}>
            <div className="auth-email-formatting">
              <label htmlFor="email">Email: </label>
              <input
                id="email"
                className="inputField"
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button className="button block" aria-live="polite">
                Send magic link
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
