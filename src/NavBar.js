import React from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";

function NavBar() {
	return (	
		<nav>
			<ul>
				<li>
					<Link to="/">Video of the Day</Link>
				</li>

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