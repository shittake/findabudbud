import { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Layout from "./Pages/Layout";
import LeaderboardPage from "./Pages/LeaderboardPage";
import VideoPage from "./Pages/VideoPage";
import ChatPage from "./Pages/ChatPage";
import Welcome from "./Components/Welcome/Welcome";
import ChatwootWidget from "./chatwoot.js";
import TextField from "@mui/material/TextField";
import Header from "./Header";

import {
  FacebookShareButton,
  FacebookIcon,
  FacebookShareCount,
  WhatsappShareButton,
  EmailShareButton,
  EmailIcon,
  WhatsappIcon,
} from "react-share";

import Games from "./Components/Preferences/Games";
import {
  RedButton,
  BlueButton,
  GreenButton,
} from "./Components/Buttons/ColouredButtons";

const Account = ({ session }) => {

  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState(null);
  const [brawl_stars, setBrawlStars] = useState(false);
  const [mobile_legends, setMobileLegends] = useState(false);
  const [anime, setAnime] = useState(false);
  const [french, setFrench] = useState(false);
  const [korean, setKorean] = useState(false);
  const [avatar_url, setAvatarUrl] = useState(null);
  const [isActive, setActive] = useState("false");
  const [points, setPoints] = useState(0);
  const [clickGames, setClickGames] = useState("false"); //check if user clicked on the "Games" header
  const [clickShows, setClickShows] = useState("false"); //check if user clicked on the "TV Shows/Movies" header
  const [clickLanguages, setClickLanguages] = useState("false"); //check if user clicked on the "Languages" header
  const [brawlStarsVariant, setBrawlStarsVariant] = useState("outlined");
  const [mobileLegendsVariant, setMobileLegendsVariant] = useState("outlined");
  useEffect(() => {
    getProfile();
  }, [session]);

  const handleMobileLegendsChange = () => {
    setMobileLegends(!mobile_legends);
    mobile_legends && setMobileLegendsVariant("outlined");
    !mobile_legends && setMobileLegendsVariant("contained");
  };

  const handleBrawlStarsChange = () => {
    setBrawlStars(!brawl_stars);
    brawl_stars && setBrawlStarsVariant("outlined");
    !brawl_stars && setBrawlStarsVariant("contained");
  };

  const handleAnimeChange = () => {
    return setAnime(!anime);
  };

  const handleKoreanChange = () => {
    setKorean(!korean);
  };

  const handleFrenchChange = () => {
    return setFrench(!french);
  };

  const toggleGames = () => {
    return setClickGames(!clickGames);
  };

  const toggleShows = () => {
    return setClickShows(!clickShows);
  };

  const toggleLanguages = () => {
    return setClickLanguages(!clickLanguages);
  };

  const handleSinglePress = () => {
    alert("4 points added!");
    updatePoints(4);
  };

  // Method to update a user's points in database
  // Input --> an integer representing the number of points added

  const updatePoints = async (number) => {
    setLoading(true);
    try {
      const user = supabase.auth.user();

      const { error } = await supabase
        .from("profiles")
        .update({ points: points + number })
        .eq("id", session.user.id);

      if (error) throw error;
    } catch (error) {
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
      window.location.reload(false); // force the page to refresh
    }
  };

  // Method to obtain user's profile once he logs in

  const getProfile = async () => {
    try {
      setLoading(true);
      const user = supabase.auth.user();

      let { data, error, status } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setUsername(data.username);
        setBrawlStars(data.brawl_stars);
        setBrawlStarsVariant(data.brawl_stars ? "contained" : "outlined");
        setMobileLegends(data.mobile_legends);
        setMobileLegendsVariant(data.mobile_legends ? "contained" : "outlined");
        setAvatarUrl(data.avatar_url);
        setPoints(data.points);
        setAnime(data.anime);
        setKorean(data.korean);
        setFrench(data.french);
        setClickGames(false); //default set to false to avoid overwhelming user
        setClickShows(false); //default set to false to avoid overwhelming user
        setClickLanguages(false); //default set to false to avoid overwhelming user
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Method to update all columns for a user once he clicks on "update profile"

  const updateProfile = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const user = supabase.auth.user();

      const updates = {
        id: user.id,
        username,
        brawl_stars,
        mobile_legends,
        anime,
        korean,
        french,
        avatar_url,
        points,
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
    <Header session = {session}/>

      {/* Chatwoot widget that provides live chat functionality with support staff (aka me and felicia)*/}
      <div className="App">
        <ChatwootWidget />
      </div>

      <br></br>
      <br></br>
      {/* Welcome Message */}
      <div className="welcome-outer" style={{ margin: "0 0 10px 0" }}>
        <Welcome username={username}></Welcome>
      </div>

      {/* Instructions to user */}
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
                <div style={{ padding: "7px 0 0 0" }}>
                  <TextField
                    margin="dense"
                    size="small"
                    required
                    id="username"
                    label="Required"
                    placeholder="Your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
              </div>
            </p>

            <p>
              <div>
                {" "}
                Please indicate your preferences for the following categories.
                {"\n"}
                <br></br>
                <br></br>
                To reveal/hide the subcategories within each of the categories
                shown below, click on any of the headers!
              </div>
            </p>
          </form>
        )}
      </div>

      {/* First Category - GAMES */}

      <h1 className="clickableText">
        <strong>
          <button2 onClick={() => toggleGames()} style={{ color: "red" }}>
            {" "}
            Games{" "}
          </button2>
        </strong>
      </h1>

      {clickGames && (
        <>
          {/* Toggle button to change preference for Brawl Stars */}
          <div>
            <RedButton
              onClick={() => handleBrawlStarsChange()}
              variant={brawlStarsVariant}
              text="Brawl Stars"
            ></RedButton>
          </div>
          <br></br>

          {/* Toggle button to change preference for Mobile Legends */}
          <div>
            <RedButton
              variant={mobileLegendsVariant}
              onClick={() => handleMobileLegendsChange()}
              text="Mobile legends"
            ></RedButton>
          </div>
          <br></br>
        </>
      )}

      {/* This is shown if the GAMES heading is not clicked. */}
      {!clickGames && (
        <>
          <div2>
            Click "Games" if you would like to see the different game
            subcategories!
          </div2>
        </>
      )}

      <br></br>

      {/* Second Heading - TV Shows/Movies */}
      <h1 className="clickableText">
        <strong>
          <button2 onClick={() => toggleShows()} style={{ color: "green" }}>
            {" "}
            TV Shows/Movies{" "}
          </button2>
        </strong>
      </h1>

      {clickShows && (
        <>
          {/* Toggle button to change preference for Anime */}
          <div>
            <GreenButton
              onClick={() => handleAnimeChange()}
              variant={anime ? "contained" : "outlined"}
              text="Anime"
            ></GreenButton>
          </div>
          <br></br>
        </>
      )}

      {/* This is shown if the TV Shows/Movies header is not clicked */}
      {!clickShows && (
        <>
          <div2>
            Click "TV Shows{"/"}Movies" if you would like to see the different
            TV Shows or movie subcategories!
          </div2>
        </>
      )}

      <br></br>

      {/* Third heading - LANGUAGES */}
      <h1 className="clickableText">
        <strong>
          <button2 onClick={() => toggleLanguages()} style={{ color: "blue" }}>
            {" "}
            Languages{" "}
          </button2>
        </strong>
      </h1>

      {clickLanguages && (
        <>
          {/* Toggle button to change preference for French */}
          <div>
            <BlueButton
              variant={french ? "contained" : "outlined"}
              onClick={() => handleFrenchChange()}
              text="French"
            ></BlueButton>
          </div>
          <br></br>
          <div>
            <BlueButton
              variant={korean ? "contained" : "outlined"}
              onClick={() => handleKoreanChange()}
              text="Korean"
            ></BlueButton>
          </div>
        </>
      )}

      {/* This is shown if the Languages heading is not clicked */}
      {!clickLanguages && (
        <>
          <div2>
            Click "Languages" if you would like to see the different language
            subcategories!
          </div2>
        </>
      )}

      <br></br>

      {/* Button that updates the user profile and updates database once user clicks */}
      <form onSubmit={updateProfile} className="form-widget">
        <div>
          <button className="button block primary" disabled={loading}>
            Update profile now
          </button>
        </div>
      </form>

      <br></br>

      {/* Not sure what these 2 buttons will be changed to next time */}
      <div style={{ display: "flex", flexFlow: "row nowrap" }}>
        <div className="button2">
          <center>
            <button2 onClick={handleSinglePress}> Click for 4 points! </button2>
          </center>
        </div>

        <div className="button2">
          <center>
            <button2 onClick={handleSinglePress}> Click for 4 points! </button2>
          </center>
        </div>
      </div>

      {/* To link to to other pages using Router */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<VideoPage />} />
            <Route
              path="firstpage"
              element={<LeaderboardPage session={session} />}
            />
            <Route path="chatpage" element={<ChatPage />} />
          </Route>
        </Routes>
      </BrowserRouter>

      <h1 className="parent">
        <h2 className="child">
          <FacebookShareButton
            url="https://findabud.herokuapp.com/"
            quote={"Share!"}
          >
            <FacebookIcon size={62} round={true} />
          </FacebookShareButton>
        </h2>

        <h2 className="child">
          <EmailShareButton
            url="https://findabud.herokuapp.com/"
            quote={"Share"}
          >
            <EmailIcon size={62} round={true} />
          </EmailShareButton>
        </h2>

        <h2 className="child">
          <WhatsappShareButton
            url="https://findabud.herokuapp.com/"
            quote={"Share"}
          >
            <WhatsappIcon size={62} round={true} />
          </WhatsappShareButton>
        </h2>
      </h1>

      {/* Sign out button */}
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
