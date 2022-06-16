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

	const updateRating = (rating, id) => {
		updateRatingForSecond(rating, id);
	}

	const updateRatingFirst = (rating, id) => {
		updateRatingForFirst(rating, id);
	}

	const updateRatingForFirst = async (number, id) => {
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
	       window.location.reload(false); // force the page to refresh
	    }
	  };

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

	  const updateOpenFirst = async (currState, id) => {
	    setLoading(true);
	    try {
	      const user = supabase.auth.user();

	      const { error } = await supabase
	        .from("match")
	        .update({openUpFirst: currState}) // go to this column
	        .eq('id', id)   // find the specific user

	      if (error) throw error;

	    } catch (error) {
	      alert(error.error_description || error.message);
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
        <table className = "table2">
          <tr>
            <th width = "30%">Bud</th>
            <th width = "40%">Date</th>
            <th width = "30%">Give Rating!</th>
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
                  {val.firstRated && 
                  	<>
                  	{val.firstGive == 1 && <p> You gave {val.secondName} 1 point!</p>}
                  	{val.firstGive > 1 && <p> You gave {val.secondName} {val.firstGive} points!</p>}
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
            <th width = "30%">Bud</th>
            <th width = "40%">Date</th>
            <th width = "30%">Give Rating!</th>
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
					            onClick={() => updateRatingFirst(index, val.id)}
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