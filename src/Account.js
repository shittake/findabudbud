import { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Pages/Layout";
import LeaderboardPage from "./Pages/LeaderboardPage";
import VideoPage from "./Pages/VideoPage";
import ChatPage from "./Pages/ChatPage";
import Welcome from "./Components/UI/Welcome";
import ChatwootWidget from "./chatwoot.js";
import TextField from "@mui/material/TextField";

const Account = ({ session }) => {
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState(null);
  const [brawl_stars, setBrawlStars] = useState(false);
  const [mobile_legends, setMobileLegends] = useState(false);
  const [anime, setAnime] = useState(false);
  const [french, setFrench] = useState(false);
  const [avatar_url, setAvatarUrl] = useState(null);
  const [isActive, setActive] = useState("false");
  const [points, setPoints] = useState(0);
  const [clickGames, setClickGames] = useState("false"); //check if user clicked on the "Games" header
  const [clickShows, setClickShows] = useState("false"); //check if user clicked on the "TV Shows/Movies" header
  const [clickLanguages, setClickLanguages] = useState("false"); //check if user clicked on the "Languages" header

  useEffect(() => {
    getProfile();
  }, [session]);

  const handleMobileLegendsChange = () => {
    return setMobileLegends(!mobile_legends);
  };

  const handleBrawlStarsChange = () => {
    return setBrawlStars(!brawl_stars);
  }

  const handleAnimeChange = () => {
    return setAnime(!anime);
  }

  const handleFrenchChange = () => {
    return setFrench(!french);
  }

  const toggleGames = () => {
    return setClickGames(!clickGames);
  }

  const toggleShows = () => {
    return setClickShows(!clickShows);
  }

  const toggleLanguages = () => {
    return setClickLanguages(!clickLanguages);
  }

  const handleSinglePress = () => {
    alert("to be added");
  };

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
        setMobileLegends(data.mobile_legends);
        setAvatarUrl(data.avatar_url);
        setPoints(data.points);
        setAnime(data.anime);
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
    <h1 className = "pointSystem">
      <div> {" "} <strong> Points: {points} </strong></div>
      <div> <strong> Rank: Noob </strong></div>
    </h1>

      <div className="App">
        <ChatwootWidget />
      </div>


      <div className="welcome-outer" style={{ margin: "0 0 10px 0" }}>
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
                <div style={{ padding: "7px 0 0 0" }}>
                  <TextField
                    margin="dense"
                    size="small"
                    // inputProps={{ sx: { height: 10 } }}
                    required
                    id="username"
                    label="Required"
                    // defaultValue="Hello World"
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
                Please indicate your preferences for the following categories.{"\n"}
                <br></br>
                <br></br>
                To reveal/hide the subcategories within each of the categories shown below, click on any of the yellow text!
              </div>
            </p>
          </form>
        )}
      </div>

    <h1 className= "clickableText"><strong> 
    <button2 onClick={()=>toggleGames()}> Games </button2></strong></h1>

    {clickGames && <>
    {/* Toggle button to change preference for Brawl Stars */}
      <div>
        <button onClick={() => handleBrawlStarsChange()}>
          Brawl Stars?
        </button>
        {brawl_stars
          ? " Yes I love Brawl Stars!"
          : " Not really interested"}
      </div>

      <br></br>

    {/* Toggle button to change preference for Mobile Legends */}
      <div>
        <button onClick={() => handleMobileLegendsChange()}>
          Mobile legends?
        </button>
        {mobile_legends
          ? " Yes I love Mobile Legends!"
          : " Not really interested"}
      </div>

      <br></br>
    </> 
    }

    {!clickGames && <>
      <div2>
        Click "Games" if you would like to see the different game subcategories!
      </div2>
      </>
    }

    <br></br>
    <h1 className= "clickableText"><strong> 
    <button2 onClick={()=>toggleShows()}> TV Shows/Movies </button2></strong></h1>

    {clickShows && <>
    {/* Toggle button to change preference for Anime */}
      <div>
        <button onClick={() => handleAnimeChange()}>
          Anime?
        </button>
        {anime
          ? " Yes I love Anime!"
          : " Not really interested"}
      </div>

      <br></br>
      </>
    }

    {!clickShows && <>
      <div2>
        Click "TV Shows{"/"}Movies" if you would like to see the different TV Shows or movie subcategories!
      </div2>
      </>
    }

    <br></br>
    <h1 className= "clickableText"><strong> 
    <button2 onClick={()=>toggleLanguages()}> Languages </button2></strong></h1>

    {clickLanguages && <>
      {/* Toggle button to change preference for French */}
        <div>
          <button onClick={() => handleFrenchChange()}>
            French?
          </button>
          {french
            ? " Yes I want to learn or practise French!"
            : " Not really interested"}
        </div>
      </>
    }

    {!clickLanguages && <>
        <div2>
          Click "Languages" if you would like to see the different language subcategories!
        </div2>
      </>
    }


      <br></br>
      <form onSubmit={updateProfile} className="form-widget">
        <div>
          <button className="button block primary" disabled={loading}>
            Update profile now
          </button>
        </div>
      </form>
      <br></br>

      
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
            <Route index element={<VideoPage />} />
            <Route path="firstpage" element={<LeaderboardPage session={session} />} />
            <Route path="chatpage" element={<ChatPage />} />
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
