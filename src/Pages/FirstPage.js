import { useState } from "react";
import React from 'react';
import { supabase } from "../supabaseClient";

const FirstPage = ({session}) => {
	const [username, setUsername] = useState(null);
  	const [brawl_stars, setBrawlStars] = useState(null);

return(
	<>
		<div>
		This is the first page.
		Testing
		</div>
	</>);	
}

export default FirstPage;