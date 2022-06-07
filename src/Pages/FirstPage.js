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

  	/* Template code:
	<p><center><strong> People who love brawl stars: </strong></center></p>
	{users.filter(user => user.brawl_stars).map(user => <p><center>{user.username}</center></p>)}
	*/
  
return(
	<>

	<div className="formatTable">
      <table>
        <tr>
          <th>Rank</th>
          <th>Username</th>
          <th>Points</th>
        </tr>
        {users.sort((a,b) => a.points < b.points ? 1: -1).map((val, key) => {
          return (
            <tr key={key}>
              <td>{key+1}</td>
              <td>{val.username}</td>
              <td>{val.points}</td>
            </tr>
          )
        })}
      </table>
    </div>

	</>);	
}

export default FirstPage;