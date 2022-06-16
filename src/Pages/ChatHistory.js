import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import Header from "../Header";
import Footer from "../Footer";
import ChatwootWidget from "../chatwoot.js";
import React from 'react';

const ChatHistory = ({session}) => {

	const [matchWithOthers, setMatches] = useState([]);
	const [matched, setMatched] = useState([]);
	const [loading, setLoading] = useState(false);
	const [rating, setRating] = useState(0);
  	const [hover, setHover] = useState(0);

	const toggleOpen = (id) => {
		updateOpen(true, id);
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

	const updateRating = (rating, id) => {
		updateRatingForSecond(rating, id);
	}

	const updateRatingForSecond = async (number, id) => {
	    setLoading(true);
	    try {
	      const user = supabase.auth.user();

	      const { error } = await supabase
	        .from("match")
	        .update({firstGive: number, firstRated: true}) // go to this column
	        .eq('id', id)   // find the specific user

	      if (error) throw error;

	    } catch (error) {
	      alert(error.error_description || error.message);
	    } finally {
	      setLoading(false);
	       window.location.reload(false); // force the page to refresh
	    }
	  };

	  const updateOpen = async (currState, id) => {
	    setLoading(true);
	    try {
	      const user = supabase.auth.user();

	      const { error } = await supabase
	        .from("match")
	        .update({openUp: currState}) // go to this column
	        .eq('id', id)   // find the specific user

	      if (error) throw error;

	    } catch (error) {
	      alert(error.error_description || error.message);
	    } finally {
	      setLoading(false);
	      window.location.reload(false); // force the page to refresh
	    }
	  };

	const rate = (id) => {
		updateRatingForSecond(1,id);
	}

	useEffect(() => {
		getSessionsFirst();
	}, [])

	useEffect(() => {
		getSessionsSecond();
	})

	return (
		<>
		<Header session={session} />

	    <div className="App">
	      <ChatwootWidget />
	    </div>

		<div className="neutral"><center><strong> Your Chat History </strong></center></div>
		<div className="success"><center><strong> Chats initiated by you </strong></center></div>

		<div className="formatTable">
        <table>
          <tr>
            <th>Bud</th>
            <th>Date</th>
            <th>Give Rating!</th>
          </tr>
          {matchWithOthers
            .map((val, key) => {
              return (
                <tr key={key}>                
                  <td>{val.secondName}</td>
                  <td>{val.date}</td>
                  <td>{!val.firstRated && 
                  	<>
                  	{!val.openUp && <button className="tableButton" onClick={() => toggleOpen(val.id)}>Give Rating</button>}

                  	{val.openUp && 
                  		<div className="star-rating">
					      {[...Array(5)].map((star, index) => {
					        index += 1;
					        return (
					          <button
					            type="button"
					            key={index}
					            className={index <= (hover || rating) ? "on" : "off"}
					            onClick={() => updateRating(index, val.id)}
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
                  {val.firstRated && <p> You gave {val.secondName} {val.firstGive} points!</p>}</td>
                </tr>
              );
            })}
        </table>
      </div>
		<Footer />

		</>


	);
}

export default ChatHistory;