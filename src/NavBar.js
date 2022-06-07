import React from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import videologo from "./Images/VideoOfTheDay.png";
import leaderboard from "./Images/LeaderboardNew.png";
import match from "./Images/Match.png";


function NavBar() {
	return (	
		<nav>
			<ul>
				<Link to="/">
					<h1 className="homepageimage">
          				<img src={videologo} class="centerimage" height="170" style ={{cursor:'pointer'}} />
        			</h1>
				</Link>


				<Link to="/firstpage">
					<h1 className="homepageimage">
          				<img src={leaderboard} class="centerimage" height="170" style ={{cursor:'pointer'}} />
        			</h1>
				</Link>

				<Link to="/chatpage">
					<h1 className="homepageimage">
          				<img src={match} class="centerimage" height="170" style ={{cursor:'pointer'}} />
        			</h1>
				</Link>
			</ul>
		</nav>
	);
}

export default NavBar;