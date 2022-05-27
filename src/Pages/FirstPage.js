import { useState, useEffect } from "react";
import React from 'react';
import { supabase } from "../supabaseClient";

const FirstPage = ({session}) => {
	const [username, setUsername] = useState(null);
  	const [brawl_stars, setBrawlStars] = useState(null);

  	const [users, setUsers] = useState([]);

  	const fetchData = async () => {
  		const {data, error} = await supabase
  		.from('profiles')
  		.select('*')

  		console.log(data);

  		setUsers(data);
  	}

  	useEffect(() => {
  		fetchData();
  	},[])


  
return(
	<>
	<p><center><strong> People who love brawl stars: </strong></center></p>
	{users.filter(user => user.brawl_stars).map(user => <p><center>{user.username}</center></p>)}

	</>);	
}

export default FirstPage;