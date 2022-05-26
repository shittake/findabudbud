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
  		.select('username')

  		console.log(data);

  		setUsers(data);
  	}

  	useEffect(() => {
  		fetchData();
  	},[])


  
return(
	<>
	{users.map(user => <p>{user.username}</p>)}
	</>);	
}

export default FirstPage;