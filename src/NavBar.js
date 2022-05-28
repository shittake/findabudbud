import React from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";

function NavBar() {
	return (	
		<nav>
			<ul>
				<li>
					<Link to="/">TestPage</Link>
				</li>

				<li>
					<Link to="firstpage">FirstPage</Link>
				</li>

				<li>
					<Link to="chatpage">ChatPage</Link>
				</li>
			</ul>
		</nav>
	);
}

export default NavBar;