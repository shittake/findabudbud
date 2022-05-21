import { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";

const Account = ({ session }) => {
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState(null);
  const [brawl_stars, setBrawlStars] = useState(null);
  const [avatar_url, setAvatarUrl] = useState(null);

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
          Please key in your name and indicate your gender and preferences.{" "}
        </center>
      </h1>
      <div aria-live="polite">
        {loading ? (
          "Saving ..."
        ) : (
          <form onSubmit={updateProfile} className="form-widget">
            <div>Email: {session.user.email}</div>
            <div>Check</div>
            <div>
              <label htmlFor="username">Name</label>
              <input
                id="username"
                type="text"
                value={username || ""}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="brawl_stars">Brawl stars?</label>
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
        <button
          type="button"
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
