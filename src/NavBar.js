import React from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import videologo from "./Images/VideoOfTheDay.png"


function NavBar() {
	return (	
		<nav>
			<ul>
				<Link to="/">
					<h1 className="homepageimage">
          				<img src={videologo} class="centerimage" height="170" style ={{cursor:'pointer'}} />
        			</h1>
				</Link>


				<li>
					<Link to="firstpage">People who love brawl stars</Link>
				</li>

				<li>
					<Link to="chatpage">Chat Page that is not working yet</Link>
				</li>
			</ul>
		</nav>
	);
}

export default NavBar;