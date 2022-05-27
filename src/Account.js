import { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";
import MainPage from "./MainPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Pages/Layout";
import FirstPage from "./Pages/FirstPage";
import TestPage from "./Pages/TestPage";
import Welcome from "./Components/UI/Welcome";

const Account = ({ session }) => {
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState(null);
  const [brawl_stars, setBrawlStars] = useState(null);
  const [avatar_url, setAvatarUrl] = useState(null);
  const [isActive, setActive] = useState("false");
  const lstOfPreferences = [];

  useEffect(() => {
    getProfile();
  }, [session]);

  const handleToggle = () => {
    setActive(!isActive);

    if (isActive) {
      alert("press twice");
    }
  };

  const handleSinglePress = () => {
    alert("press once");
  };

  const getProfile = async () => {
    try {
      setLoading(true);
      const user = supabase.auth.user();

      let { data, error, status } = await supabase
        .from("profiles")
        .select(`username, website, brawl_stars, avatar_url`)
        .eq("id", user.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setUsername(data.username);
        setBrawlStars(data.brawl_stars);
        setAvatarUrl(data.avatar_url);
        if (brawl_stars) {
          lstOfPreferences.push("Brawl stars");
        }
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const user = supabase.auth.user();

      const updates = {
        id: user.id,
        username,
        brawl_stars,
        avatar_url,
        updated_at: new Date(),
      };

      let { error } = await supabase.from("profiles").upsert(updates, {
        returning: "minimal", // Don't return the value after inserting
      });

      if (error) {
        throw error;
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="welcome-outer">
        <Welcome></Welcome>
      </div>
      <h2>Please key in your profile details: </h2>

      <div aria-live="polite">
        {loading ? (
          "Saving ..."
        ) : (
          <form onSubmit={updateProfile} className="form-widget">
            <p>Email: {session.user.email}</p>
            <p>
              <div>
                <label htmlFor="username">Username: </label>
                <div>
                  <input
                    id="username"
                    type="text"
                    value={username || ""}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
              </div>
            </p>
            <p>
              <div>
                {" "}
                Please indicate your preferences for the following categories.{" "}
              </div>
              <div>
                {" "}
                Please type 'yes' or 'y' only if you wish to put that as one of
                your preferences.{" "}
              </div>
              <div> Your results will be saved the next time you log in. </div>
            </p>
            <p>
              <label htmlFor="brawl_stars">Brawl Stars? </label>
              <div>
                <input
                  id="brawl_stars"
                  type="boolean"
                  value={brawl_stars || ""}
                  onChange={(e) => setBrawlStars(e.target.value)}
                />
              </div>
            </p>

            <div>
              <button className="button block primary" disabled={loading}>
                Update profile now
              </button>
            </div>
          </form>
        )}
      </div>

      <br></br>

      <div className="button1">
        <center>
          <button1 onClick={handleToggle}>
            {" "}
            Double click me to obtain our contact information!{" "}
          </button1>
        </center>
      </div>

      <br></br>
      <br></br>

      <div style={{ display: "flex", flexFlow: "row nowrap" }}>
        <div className="button2">
          <center>
            <button2 onClick={handleSinglePress}>
              {" "}
              Click for some information!{" "}
            </button2>
          </center>
        </div>

        <div className="button2">
          <center>
            <button2 onClick={handleSinglePress}>
              {" "}
              Click for some information!{" "}
            </button2>
          </center>
        </div>
      </div>

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<TestPage />} />
            <Route path="firstpage" element={<FirstPage session={session} />} />
          </Route>
        </Routes>
      </BrowserRouter>

      <div>
        <br></br>
        <hr></hr>

        <button
          className="button block"
          onClick={() => supabase.auth.signOut()}
        >
          Sign Out
        </button>
      </div>
    </>
  );
};

export default Account;
