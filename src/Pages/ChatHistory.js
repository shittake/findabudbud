import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import HeaderHistory from "../Components/Header/HeaderHistory";
import Footer from "../Footer";
import ChatwootWidget from "../chatwoot.js";
import React from 'react';

const ChatHistory = ({session}) => {

	const [matchWithOthers, setMatches] = useState([]);
	const [matched, setMatched] = useState([]);
	const [loading, setLoading] = useState(false);
	const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);  
  const [users, setUsers] = useState([]);

        const fetchData = async () => {
                const {data, error} = await supabase
                .from('profiles')
                .select('*')

                setUsers(data);

        }

        useEffect(() => {
                fetchData();
        },[])

	const toggleOpenFirst = (id) => {
		updateOpenFirst(true, id);
	}

	const toggleOpenSecond = (id) => {
		updateOpenSecond(true, id);
	}

	const getSessionsFirst = async() => {
		let { data, error } = await supabase
  			.from('match')
  			.select("*")
  			.eq("firstuser", session.user.id)

  		setMatches(data);
	}

	const getSessionsSecond = async() => {
		let { data, error } = await supabase
  			.from('match')
  			.select("*")
  			.eq("seconduser", session.user.id)
  		setMatched(data);
	}

	const updateRating = (rating, id, person) => {
		updateRatingForSecond(rating, id, person);
		if (users != [] || users != null){
			updateTotalRating(
				parseInt((users.filter(user => user.id == person).map(user => user.total_rating))[0]) + rating,
				person,
				parseInt((users.filter(user => user.id == person).map(user => user.matches))[0]) + 1
				)
		}

	}

	const updateRatingFirst = (rating, id, person) => {
		updateRatingForFirst(rating, id, person);	
		if (users != [] || users != null){
			updateTotalRating(
				parseInt((users.filter(user => user.id == person).map(user => user.total_rating))[0]) + rating,
				person,
				parseInt((users.filter(user => user.id == person).map(user => user.matches))[0]) + 1
				)
		}
	}

	const updateRatingForFirst = async (number, id, person) => {
	    setLoading(true);
	    try {
	      const user = supabase.auth.user();
	      
	      const { error } = await supabase
	        .from("match")
	        .update({secondGive: number, secondRated: true}) // go to this column
	        .eq('id', id)   // find the specific user

	      if (error) throw error;

	    } catch (error) {
	      alert(error.error_description || error.message);
	    } finally {
	      setLoading(false);
	      window.location.reload(false);
	    }
	  };

	  const updateTotalRating= async (number, person, number2) => {
	    setLoading(true);
	    try {
	      const user = supabase.auth.user();
	      
	      const { error } = await supabase
	        .from("profiles")
	        .update({total_rating: number, matches: number2}) // go to this column
	        .eq('id', person)   // find the specific user

	      if (error) return;

	    } finally {
	      setLoading(false);
	      window.location.reload(false);
	    }
	  };

	const updateRatingForSecond = async (number, id, person) => {
	    setLoading(true);
	    try {
	      const user = supabase.auth.user();
	      
	      const { error } = await supabase
	        .from("match")
	        .update({firstGive: number, firstRated: true}) // go to this column
	        .eq('id', id)   // find the specific user

	      if (error) return;

	    } finally {
	      setLoading(false);
	      window.location.reload(false);
	    }
	  };

	  const updateOpenFirst = async (currState, id) => {
	    setLoading(true);
	    try {
	      const user = supabase.auth.user();

	      const { error } = await supabase
	        .from("match")
	        .update({openUpFirst: currState}) // go to this column
	        .eq('id', id)   // find the specific user

	      if (error) return;

	    } finally {
	      setLoading(false);
	      window.location.reload(false); // force the page to refresh
	    }
	  };

	  const updateOpenSecond = async (currState, id) => {
	    setLoading(true);
	    try {
	      const user = supabase.auth.user();

	      const { error } = await supabase
	        .from("match")
	        .update({openUpSecond: currState}) // go to this column
	        .eq('id', id)   // find the specific user

	      if (error) throw error;

	    } catch (error) {
	      alert(error.error_description || error.message);
	    } finally {
	      setLoading(false);
	      window.location.reload(false); // force the page to refresh
	    }
	  };

	useEffect(() => {
		getSessionsFirst();
	}, [])

	useEffect(() => {
		getSessionsSecond();
	})

	return (
		<>
		<HeaderHistory session={session} />

	    <div className="App">
	      <ChatwootWidget />
	    </div>

		<div className="neutral" id="chatHistory"><center><strong> Your Chat History </strong></center></div>
		<div className="success"><center><strong> Chats initiated by you </strong></center></div>

		<div className="formatTable">
        <table className = "table2">
          <tr>
            <th width = "20%">Bud</th>
            <th width = "35%">Matched Date</th>
            <th width = "25%">Give Rating!</th>
            <th width = "20%">Rating received</th>
          </tr>

          {matchWithOthers
            .map((val, key) => {
              return (
                <tr key={key}>                
                  <td>{val.secondName}</td>
                  <td>{val.date}</td>
                  <td>{!val.firstRated && 
                  	<>
                  	{!val.openUpFirst && <button className="tableButton" onClick={() => toggleOpenFirst(val.id)}>Give Rating</button>}

                  	{val.openUpFirst && 
                  		<div className="star-rating">
					      {[...Array(5)].map((star, index) => {
					        index += 1;
					        return (
					          <button
					            type="button"
					            key={index}
					            className={index <= (hover || rating) ? "on" : "off"}
					            onClick={() => updateRating(index, val.id,val.seconduser)}
					            onMouseEnter={() => setHover(index)}
					            onMouseLeave={() => setHover(rating)}
					          >
					            <span className="star">&#9733;</span>
					          </button>
					        );
					      })}
					    </div>
						}
                  	</>
                  }
                  {val.firstRated && 
                  	<>
                  	{val.firstGive == 1 && <p> You gave {val.secondName} 1 point!</p>}
                  	{val.firstGive > 1 && <p> You gave {val.secondName} {val.firstGive} points!</p>}
                  	</>
                  }
                  </td>

                 	<td>{val.secondRated && 
                 		<>
                 		{val.secondGive == 1 && <p>{val.secondName} gave you 1 point!</p>}
                 		{val.secondGive > 1 && <p>{val.secondName} gave you {val.secondGive} points!</p>}
                 		</>
                 	}
                 	{!val.secondRated && 
                 		<>
                 		{val.secondName} has not rated you yet!
                 		</>
                 	}
                 	</td>
                </tr>
              );
            })}
        </table>
      </div>


      <div className="success"><center><strong> Chats initiated by other people </strong></center></div>

		<div className="formatTable">
        <table className = "table2">
          <tr>
            <th width = "20%">Bud</th>
            <th width = "35%">Matched Date</th>
            <th width = "25%">Give Rating!</th>
            <th width = "20%">Rating received</th>
          </tr>
          {matched
            .map((val, key) => {
              return (
                <tr key={key}>                
                  <td>{val.firstName}</td>
                  <td className = "small">{val.date}</td>
                  <td>{!val.secondRated && 
                  	<>
                  	{!val.openUpSecond && <button className="tableButton" onClick={() => toggleOpenSecond(val.id)}>Give Rating</button>}

                  	{val.openUpSecond && 
                  		<div className="star-rating">
					      {[...Array(5)].map((star, index) => {
					        index += 1;
					        return (
					          <button
					            type="button"
					            key={index}
					            className={index <= (hover || rating) ? "on" : "off"}
					            onClick={() => updateRatingFirst(index, val.id, val.firstuser)}
					            onMouseEnter={() => setHover(index)}
					            onMouseLeave={() => setHover(rating)}
					          >
					            <span className="star">&#9733;</span>
					          </button>
					        );
					      })}
					    </div>
						}
                  	</>
                  }

                  {val.secondRated && 
                  	<>
                  	{val.secondGive == 1 && <p> You gave {val.firstName} 1 point!</p>}
                  	{val.secondGive > 1 && <p> You gave {val.firstName} {val.secondGive} points!</p>}
                  	</>
                  }
                  </td>  

                  <td>
                  {val.firstRated && 
                  	<>
                  	{val.firstGive == 1 && <p> {val.firstName} gave you 1 point! </p>}
                  	{val.firstGive > 1 && <p> {val.firstName} gave you {val.firstGive} points! </p>}
                  	</>
                  }    
                  {!val.firstRated && 
                  	<>
                  	{val.firstName} has not rated you yet!
                  	</>
                  }
                  </td>    
                </tr>
              );
            })}
        </table>       
      </div>

      <br></br><br></br>
		<Footer />

		</>


	);
}

export default ChatHistory;