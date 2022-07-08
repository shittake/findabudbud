import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import Welcome from "../Components/Welcome/Welcome";
import ChatwootWidget from "../chatwoot.js";
import TextField from "@mui/material/TextField";
import HeaderProfile from "../Components/Header/HeaderProfile";
import Footer from "../Footer";
import { Navigate, useNavigate } from "react-router-dom";

import {
  FacebookShareButton,
  FacebookIcon,
  WhatsappShareButton,
  TelegramShareButton,
  LinkedinShareButton,
  LinkedinIcon,
  TelegramIcon,
  WhatsappIcon,
} from "react-share";

import Games from "../Components/Preferences/Games";
import {
  RedButton,
  BlueButton,
  GreenButton,
  PurpleButton
} from "../Components/Buttons/ColouredButtons";

const ProfilePage = ({ session }) => {
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState(null);
  const [telegram_handle, setTelegramHandle] = useState(null);
  const [brawl_stars, setBrawlStars] = useState(false);
  const [mobile_legends, setMobileLegends] = useState(false);
  const [anime, setAnime] = useState(false);
  const [french, setFrench] = useState(false);
  const [korean, setKorean] = useState(false);
  const [badminton, setBadminton] = useState(false);
  const [soccer, setSoccer] = useState(false);
  const [food, setFood] = useState(false);
  const [study, setStudy] = useState(false);
  const [avatar_url, setAvatarUrl] = useState(null);
  const [isActive, setActive] = useState("false");
  const [points, setPoints] = useState(0);
  const [shares, setShares] = useState(0);
  const [point_history, setPointHistory] = useState(0);
  const [clickGames, setClickGames] = useState("false"); //check if user clicked on the "Games" header
  const [clickShows, setClickShows] = useState("false"); //check if user clicked on the "TV Shows/Movies" header
  const [clickLanguages, setClickLanguages] = useState("false"); //check if user clicked on the "Languages" header
  const [clickSports, setClickSports] = useState("false"); //check if user clicked on the "Sports" header
  const [clickOthers, setClickOthers] = useState("false"); //check if user clicked on the "Others" header
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
    return setKorean(!korean);
  };

  const handleFrenchChange = () => {
    return setFrench(!french);
  };

  const handleBadmintonChange = () => {
    return setBadminton(!badminton);
  };

  const handleSoccerChange = () => {
    return setSoccer(!soccer);
  };

  const handleFoodChange = () => {
    return setFood(!food);
  };

  const handleStudyChange = () => {
    return setStudy(!study);
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

  const toggleOthers = () => {
    return setClickOthers(!clickOthers);
  };

  const toggleSports = () => {
    return setClickSports(!clickSports);
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
    }
  };

  const updateShares = async (number) => {
    setLoading(true);
    try {
      const user = supabase.auth.user();

      const { error } = await supabase
        .from("profiles")
        .update({ shares: number })
        .eq("id", session.user.id);

      if (error) throw error;
    } catch (error) {
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
      window.location.reload(false); // force the page to refresh
    }
  };

  // Update point history that is stored in supabase
  // The input "message" MUST be of the form: {comma} + {point change} (space) + {Activity} (space) + {current date}
  // For example, the string ",+2 Shared using social media 14/6/2022" is in the correct format
  const updateHistory = async (message) => {
    setLoading(true);
    try {
      const user = supabase.auth.user();

      const { error } = await supabase
        .from("profiles")
        .update({ point_history: point_history+message})
        .eq("id", session.user.id);

      if (error) throw error;
    } catch (error) {
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
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
        setShares(data.shares);
        setAnime(data.anime);
        setKorean(data.korean);
        setFrench(data.french);
        setPointHistory(data.point_history);
        setTelegramHandle(data.telegram_handle);
        setBadminton(data.badminton);
        setSoccer(data.soccer);
        setFood(data.food);
        setStudy(data.study);
        setClickGames(false); //default set to false to avoid overwhelming user
        setClickShows(false); //default set to false to avoid overwhelming user
        setClickLanguages(false); //default set to false to avoid overwhelming user
        setClickSports(false); //default set to false to avoid overwhelming user
        setClickOthers(false); //default set to false to avoid overwhelming user
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  let navigate = useNavigate();
    const moveToAvatar = () => {
      let path = '/';
      navigate(path);
    }

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
        badminton,
        soccer,
        food,
        study,
        avatar_url,
        points,
        point_history,
        telegram_handle,
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
      alert("Profile updated!");
    }
  };

  const shareClick = () => {
    updatePoints(2);
    updateHistory(",+2 Shared using social media " + new Date().toDateString());
    setShares(shares+1);
    updateShares(shares+1);
  }

  const shareCap = () => {
    alert("Note: You can still share but you will no longer gain any more points from sharing. (capped at 10 times)");
  }

  return (
    <>
      <HeaderProfile session={session} />

      {/* Chatwoot widget that provides live chat functionality with support staff (aka me and felicia)*/}
      <div className="App">
        <ChatwootWidget />
      </div>

      <br></br>
      <br></br>
      {/* Welcome Message */}
      <div
        className="welcome-outer"
        id="welcome-message"
        style={{ margin: "0 0 10px 0" }}
      >
        <Welcome username={username}></Welcome>
      </div>


      <h1> 
        <center><img src = {avatar_url} style={{ cursor: "pointer" }} onClick = {moveToAvatar} height="170"></img></center>
      </h1>

      {/* Instructions to user */}
      <h2 id="profile1">Please key in your profile details: </h2>
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
                <br></br>
                <label htmlFor="username">Telegram Handle: </label>
                <div style={{ padding: "7px 0 0 0" }}>
                  <TextField
                    margin="dense"
                    size="small"
                    required
                    id="telegram_handle"
                    label= "Required"
                    placeholder="Your telegram handle"
                    value={telegram_handle}
                    onChange={(e) => setTelegramHandle(e.target.value)}
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

      <h1 className="clickableText" id="profile2">
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
              id="profile4"
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
          <div>
            Click "Games" if you would like to see the different game
            subcategories!
          </div>
        </>
      )}

      <br></br>

      {/* Second Heading - TV Shows/Movies */}
      <h1 className="clickableText">
        <strong>
          <button2 onClick={() => toggleShows()} style={{ color: "green" }}>
            TV Shows/Movies
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
          <div>
            Click "TV Shows{"/"}Movies" if you would like to see the different
            TV Shows or movie subcategories!
          </div>
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
          <div>
            Click "Languages" if you would like to see the different language
            subcategories!
          </div>
        </>
      )}

      <br></br>

      {/* Fourth heading - Sports */}
      <h1 className="clickableText">
        <strong>
          <button2 onClick={() => toggleSports()} style={{ color: "purple" }}>
            {" "}
            Sports{" "}
          </button2>
        </strong>
      </h1>

      {clickSports && (
        <>
          {/* Toggle button to change preference for Badminton */}
          <div>
            <PurpleButton
              variant={badminton ? "contained" : "outlined"}
              onClick={() => handleBadmintonChange()}
              text="Badminton"
            ></PurpleButton>
          </div>
          <br></br>
        {/* Toggle button to change preference for Soccer */}
          <div>
            <PurpleButton
              variant={soccer ? "contained" : "outlined"}
              onClick={() => handleSoccerChange()}
              text="Soccer"
            ></PurpleButton>
          </div>
        </>
      )}

      {/* This is shown if the Sports heading is not clicked */}
      {!clickSports && (
        <>
          <div>
            Click "Sports" if you would like to see the different sports
            subcategories!
          </div>
        </>
      )}

      <br></br>

      {/* Fifth Category - Others */}

      <h1 className="clickableText" id="profile2">
        <strong>
          <button2 onClick={() => toggleOthers()} style={{ color: "red" }}>
            {" "}
            Others{" "}
          </button2>
        </strong>
      </h1>

      {clickOthers && (
        <>
          {/* Toggle button to change preference for Food */}
          <div>
            <RedButton
              onClick={() => handleFoodChange()}
              variant={food ? "contained" : "outlined"}
              text="Food"
            ></RedButton>
          </div>
          <br></br>

          {/* Toggle button to change preference for Study */}
          <div>
            <RedButton
              variant={study ? "contained" : "outlined"}
              onClick={() => handleStudyChange()}
              text="Study"
            ></RedButton>
          </div>
          <br></br>
        </>
      )}

      {/* This is shown if the Others heading is not clicked. */}
      {!clickOthers && (
        <>
          <div>
            Click "Others" if you would like to see more
            subcategories!
          </div>
        </>
      )}

      <br></br><br></br>

      {/* Button that updates the user profile and updates database once user clicks */}
      <form onSubmit={updateProfile} className="form-widget">
        <div>
          <button
            id="profile3"
            className="button block primary"
            disabled={loading}
          >
            Update profile now
          </button>
        </div>
      </form>

      <br></br>



      <h1 className="parent" id="share">
        <h2 className="child">
          <FacebookShareButton
            url="https://findabud.herokuapp.com/"
            quote={"Share!"}
            onClick={(shares<10) ? shareClick : shareCap}
          >
            <FacebookIcon size={62} round={true} />
          </FacebookShareButton>
        </h2>

        <h2 className="child">
          <TelegramShareButton
            url="https://findabud.herokuapp.com/"
            quote={"Share"}
            onClick={(shares<10) ? shareClick : shareCap}
          >
            <TelegramIcon size={62} round={true} />
          </TelegramShareButton>
        </h2>

        <h2 className="child">
          <WhatsappShareButton
            url="https://findabud.herokuapp.com/"
            quote={"Share"}
            onClick={(shares<10) ? shareClick : shareCap}
          >
            <WhatsappIcon size={62} round={true} />
          </WhatsappShareButton>
        </h2>

        <h2 className="child">
          <LinkedinShareButton
            url="https://findabud.herokuapp.com/"
            quote={"Share"}
            onClick={(shares<10) ? shareClick : shareCap}
          >
            <LinkedinIcon size={62} round={true} />
          </LinkedinShareButton>
        </h2>
      </h1>


      <br></br><br></br><br></br><br></br><br></br>

      <Footer />
    </>
  );
};

export default ProfilePage;
