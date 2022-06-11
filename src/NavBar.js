import React from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import videologo from "./Images/VideoOfTheDay.png";
import leaderboard from "./Images/LeaderboardNew.png";
import match from "./Images/Match.png";
import events from "./Images/Events-2.png";

function NavBar() {
	return (	
		<nav>
			<ul>			
				<h3 className = 'child'>
				<Link to="/">
					<h1 className="homepageimage">
          				<img src={videologo} id ="video" height="170" style ={{cursor:'pointer'}} />
        			</h1>
				</Link>
				</h3>

				<h3 className = 'child'>
				<Link to="/firstpage">
					<h1 className="homepageimage">
          				<img src={leaderboard} id = "leaderboard" height="170" style ={{cursor:'pointer'}} />
        			</h1>
				</Link>
				</h3>

				<h3 className = 'child'>
				<Link to="/chatpage">
					<h1 className="homepageimage">
          				<img src={match} id = "chat" height="170" style ={{cursor:'pointer'}} />
        			</h1>
				</Link>
				</h3>

				<h3 className = 'child'>
				<Link to="/eventspage">
					<h1 className="homepageimage">
						<img src={events} id = "events" height="170" style={{cursor:'pointer'}} />
					</h1>
				</Link>
				</h3>
			
			</ul>
		</nav>
	);
}

export default NavBar;