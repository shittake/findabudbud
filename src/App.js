import "./index.css";
import { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";
import Auth from "./Auth";
import Account from "./Account";
import { ThemeProvider } from "@mui/material";
import theme from "./Components/Buttons/ButtonStylingTheme";
import Router from "./Components/Router";
import axios from "axios";

export default function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    setSession(supabase.auth.session());

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <div className="container" style={{ padding: "50px 0 50px 0" }}>
        {" "}
        {!session ? <Auth /> : <Router session={session} />}
      </div>
    </ThemeProvider>
  );
}
