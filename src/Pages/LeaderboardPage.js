import { useState, useEffect } from "react";
import React from "react";
import { supabase } from "../supabaseClient";
import ChatwootWidget from "../chatwoot.js";
import Header from "../Header";
import Footer from "../Footer";
import "../styles.css";

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

  var i;
  const findTitle = (points) => {
    var pointCutoff = [0, 2, 10, 20, 30, 50, 75, 100, 140, 200]
    var titles = ["New User", "Novice", "Warming Up", "Journeyman","Specialist", "Senior","Master","Grandmaster"]

    var answer = "";
    for (i=0;i<pointCutoff.length-1;i++){
      if (points >= pointCutoff[i] && points < pointCutoff[i+1]) {
        answer = titles[i];
        break;
      }
    }
    if (answer == "") {
      return "God";
    } else {
      return answer;
    }
  }

  const findAvatar = (link) => {
    if (link != null) return link;
    else return "https://avatars.dicebear.com/api/bottts/1000.svg";
  }

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
      <Header session={session} />

      <div className="App">
        <ChatwootWidget />
      </div>

      <div className="title">
        <center>
          <strong>Top 10 Users in Findabud</strong>
        </center>
      </div>
      <br></br>

      <div className="formatTable">
        <table>
          <tr>
            <th>Rank</th>
            <th>Username</th>
            <th>Points</th>
            <th>Title</th>
            <th>Avatar</th>
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
                  <td><img src={findAvatar(val.avatar_url)} /></td>
                </tr>
              );
            })}
        </table>
      </div>

      <br></br>
      <div>
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
      <Footer />
    </>
  );
};

export default LeaderboardPage;
