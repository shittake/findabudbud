import { useState, useEffect } from "react";
import React from "react";
import { supabase } from "../supabaseClient";
import ChatwootWidget from "../chatwoot.js";
import HeaderLeaderboard from "../Components/Header/HeaderLeaderboard";
import Footer from "../Footer";
import "../styles.css";
import findTitle from "../Components/Methods/findTitle";

const LeaderboardPage = ({ session }) => {
  const [username, setUsername] = useState(null);
  const [brawl_stars, setBrawlStars] = useState(null);

  const [users, setUsers] = useState([]);

  const fetchData = async () => {
    const { data, error } = await supabase.from("profiles").select("*");

    setUsers(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const findAvatar = (link) => {
    if (link != null) return link;
    else return "https://avatars.dicebear.com/api/bottts/1000.svg";
  };

  /* Template code:
  <p><center><strong> People who love brawl stars: </strong></center></p>
  {users.filter(user => user.brawl_stars).map(user => <p><center>{user.username}</center></p>)}
  */

  // To get the current user's number of points:
  var number = users
    .filter((user) => user.id == session.user.id)
    .map((user) => user.points);
  var totalUsers = users.length;

  return (
    <>
      <HeaderLeaderboard session={session} />

      <div className="App">
        <ChatwootWidget />
      </div>

      <br></br>

      <div className="title">
        <center>
          <strong>Top 10 Users in Findabud</strong>
        </center>
      </div>

      <div className="formatTable" id="table">
        <table>
          <tbody>
            <tr>
              <th>Rank</th>
              <th>Username</th>
              <th>Points</th>
              <th>Title</th>
              <th>Avatar</th>
              <th>Total Matches</th>
              <th>Average Rating</th>
            </tr>

            {users
              .sort((a, b) => (a.points < b.points ? 1 : -1))
              .slice(0, 10)
              .map((val, key) => {
                return (
                  <tr key={key}>
                    <td>
                      {users.filter((user) => user.points > val.points).length +
                        1}
                    </td>
                    <td>{val.username}</td>
                    <td>{val.points}</td>
                    <td>{findTitle(val.points)}</td>
                    <td>
                      <img src={findAvatar(val.avatar_url)} />
                    </td>
                    <td>{val.matches}</td>
                    <td>
                      {val.matches >= 1 && (
                        <p>
                          {(val.total_rating / val.matches).toFixed(2)} stars{" "}
                        </p>
                      )}
                      {val.matches == 0 && <p>Nothing yet!</p>}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>

      <br></br>
      <div id="standing">
        <center>
          {" "}
          You have{" "}
          <strong>
            {" "}
            {number} {number == 1 ? "point" : "points"}{" "}
          </strong>{" "}
          now, which places you in rank{" "}
          <strong>
            {" "}
            {users.filter((user) => user.points > number).length + 1}
          </strong>{" "}
          out of <strong> {totalUsers} </strong> buds!
        </center>
      </div>

      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>

      <Footer session={session} />
    </>
  );
};

export default LeaderboardPage;
