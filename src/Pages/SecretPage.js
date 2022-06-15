import { useState, useEffect } from "react";
import React from "react";
import { supabase } from "../supabaseClient";
import ChatwootWidget from "../chatwoot.js";
import Header from "../Header";
import Footer from "../Footer";
import addToMatch from "../Components/Match/addToMatch";

const SecretPage = ({ session }) => {

	  const [users, setUsers] = useState([]);
    const [click, setClick] = useState(false);
    const [loading, setLoading] = useState(false);


    const fetchData = async () => {
        const {data, error} = await supabase.from('profiles').select('*')

    setUsers(data);

    }

    useEffect(() => {
    fetchData();
    },[])


    const updateClick = async() => {
      setLoading(true);
      try {
        const user = supabase.auth.user();

        const { error } = await supabase
          .from("profiles")
          .update({click: false}) // go to this column
          .eq('id', session.user.id)   // find the specific user

        if (error) throw error;

      } catch (error) {
        alert(error.error_description || error.message);
      } finally {
        setLoading(false);
      }
    };

    useEffect(() => {
      updateClick();
    },[])

    // Obtain my particulars from the database
    var mine = users.filter(user => user.id == session.user.id);

    // Find the user.id of all the people who are currently online (updated < 1 hour ago) 
    var onlineUsers = Array.from(users
      .filter(user => user.click) // only among those people who clicked
      .filter(user => user.id != session.user.id) // can't match with myself!
      .map(user => user.id));

    var clickedUsernames = Array.from(users
      .filter(user => user.click)
      .map(user => user.username));

    var clickedAvatars = Array.from(users
      .filter(user => user.click)
      .map(user => (user.avatar_url!=null)?user.avatar_url:"https://avatars.dicebear.com/api/bottts/1000.svg"));

    // Parameters to filter by
    var parameters = ["brawl_stars","mobile_legends","anime","french","korean"];
    var preferences = ["Brawl Stars", "Mobile Legends", "Anime", "French", "Korean"]

    // This method finds the people who have the most number of mutual interests with myself
    // Return type: An array consisting of the IDs of those people
    const displayCommon = () => {
      var temp = mapCommon();
      var mostInCommon = [];
      var index;
      var largest = 0;

      for (index = 0; index < onlineUsers.length; index++) {
        if (temp[1][index] > largest) {
          largest = temp[1][index];
          mostInCommon = [temp[2][index]];
        } else if (temp[1][index] == largest) {
          mostInCommon.push(temp[2][index]);
        }
      }
      addToMatch(session.user.id,mostInCommon[0]); // add to "Match" table in supabase
      return mostInCommon;
    }

    // This method aims to map each username to the number of mutual interests with myself
    const mapCommon = () => {
      var i;
      var who = [];
      var ids = [];
      var totalCommon = [];
      for (i = 0; i < onlineUsers.length; i++) {
        var currUser = users.filter(user => user.id == onlineUsers[i]);
        var currUserName = currUser.map(user => user.username);
        var currID = currUser.map(user => user.id)[0];
        if (who.indexOf(currUserName) == -1){
           who.push(currUserName);
           ids.push(currID);
         }
        totalCommon.push(numberSimilar(currUser));
      }
      return [who, totalCommon, ids];
    }

    // This method converts each column into a JSON string and compares its content with my values
    // Input type: The row of another user
    // Output: An integer representing the total number of mutual interests
    const numberSimilar = (currUser) => {
      var total = 0; var i;

      for (i = 0; i < parameters.length; i++) {
        if (JSON.stringify(currUser.map((val,key) => val[parameters[i]]))
          ===
          JSON.stringify(mine.map((val,key) => val[parameters[i]]))
          &&
          JSON.stringify(mine.map((val,key) => val[parameters[i]]))
          .slice(1,-1)
          .localeCompare("true") == 0) {
          total++;
        }
      }
      return total;
    }

    const hobbiesSimilar = (currUser) => {
    	var answer = []; var i;
    	for (i = 0; i < parameters.length; i++) {
        if (JSON.stringify(currUser.map((val,key) => val[parameters[i]]))
          ===
          JSON.stringify(mine.map((val,key) => val[parameters[i]]))
          &&
          JSON.stringify(mine.map((val,key) => val[parameters[i]]))
          .slice(1,-1)
          .localeCompare("true") == 0) {
          answer.push(preferences[i]);
        }
      }
      return answer;
    }


    var besties = displayCommon(); //the IDs of all the people with most number of mutual interests
    var selected = users.filter(user => user.id == besties[0]); //the row of the selected person! right now, is just the first person
    var contact = selected.map(user => user.telegram_handle).toString()

	return (
    <>
      <Header session={session} />

      <div className="App">
        <ChatwootWidget />
      </div>

   
      {besties.length > 0 && 
        <>

      <p>
       Matching algorithm has completed. 
      </p>

      <p><center><strong> People with the most common interests with you </strong></center></p>
       {besties.map(user => <p><center> {users.filter(a=>a.id==user).map(a=>a.username)} </center></p>)}

       <p>
       		You have matched with......
       		{selected.map(user => user.username)}
       		!!
       </p>

       <p><center><strong>Both of you enjoy:</strong></center></p>

       
        <center>{hobbiesSimilar(selected).join(", ")}</center>

        <br></br><br></br>

        {contact.length >= 1 && 
          <>
          <center><a href={"https://telegram.me/" + contact} class="buttonTeleLink" target="_blank">
          Send a telegram message to {selected.map(user=>user.username)} now!</a></center>
          </>
        }

        {(contact == null || contact.length) == 0 &&
          <p>
            This user does not have a valid telegram handle!
          </p>
        }
        
        </>
      }

      {besties.length == 0 && 
        <p>
          Nobody at the moment. Try again later!
        </p>
      }

      
      <Footer />

    </>
    );
}

export default SecretPage