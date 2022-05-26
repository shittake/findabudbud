import { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";
import MainPage  from "./MainPage";
import {BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Pages/Layout";
import FirstPage from "./Pages/FirstPage";
import TestPage from "./Pages/TestPage";

const Account = ({ session }) => {
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState(null);
  const [brawl_stars, setBrawlStars] = useState(null);
  const [avatar_url, setAvatarUrl] = useState(null);
  const lstOfPreferences = []

  useEffect(() => {
    getProfile();
  }, [session]);

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
        updated_at: new Date()
      };

      let { error } = await supabase.from("profiles").upsert(updates, {
        returning: "minimal" // Don't return the value after inserting
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
      <h1>
        <center>
          Please key in your profile details!{" "}
        </center>
      </h1>

      <div aria-live="polite">
        {loading ? (
          "Saving ..."
        ) : (
          <form onSubmit={updateProfile} className="form-widget">

            <div>Email: {session.user.email}</div>

            <div>
              <label htmlFor="username">Username</label>
              <input
                id="username"
                type="text"
                value={username || ""}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div> Please indicate your preferences for the following categories. </div>
            <div> Please type 'yes' or 'y' only if you wish to put that as one of your preferences. </div>
            <div> Your results will be saved the next time you log in. </div>

            <div>
              <label htmlFor="brawl_stars">Brawl Stars?</label>
              <input
                id="brawl_stars"
                type="boolean"
                value={brawl_stars || ""}
                onChange={(e) => setBrawlStars(e.target.value)}
              />
            </div>

            <div>
              <button className="button block primary" disabled={loading}>
                Update profile now
              </button>
            </div>

          </form>
        )}
        </div>



        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element ={<TestPage />} />
              <Route path="firstpage" element={<FirstPage session = {session}/>} />
            </Route>
          </Routes>
        </BrowserRouter>
        
        

        <div>

        <br></br>
        <hr></hr>

          <button className="button block"
          onClick={() => supabase.auth.signOut()}
        >
          Sign Out
        </button>

        </div>

    </>
  );
};


export default Account;
