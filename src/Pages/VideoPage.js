import * as React from "react";
import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import Header from "../Header";
import Footer from "../Footer";
import ChatwootWidget from "../chatwoot.js";

const VideoPage = ({ session }) => {

    const [date, setDate] = useState(0);
    const [loading, setLoading] = useState(false);
    const [index, setIndex] = useState(0);
    const [link, setLink] = useState(null);

    var links = ["https://www.youtube.com/embed/G_wxQe2Litw","https://www.youtube.com/embed/FT5OYVyc7Sw"];
    var titles = ["Brawl Stars Tips", "Clash Royale Tips"];

    const fetchData = async () => {
      const { data, error } = await supabase.from("profiles").select("*");

      setDate(data.date);
      setIndex(data.index);
      setLink(links[index]);

      var currMinute = new Date().getMinutes();

      if (currMinute != date) {
        updateIndex(currMinute);
        setDate(currMinute);
        setLink(links[1]);
      }
    };

    useEffect(() => {
      fetchData();
      }, [session]);

    const updateIndex = async (number) => {
      setLoading(true);
      try {
        const user = supabase.auth.user();

        const { error } = await supabase
          .from("profiles")
          .update({date: number}) // go to this column
          .eq('id', session.user.id)   // find the specific user


        if (error) throw error;

      } catch (error) {
        alert(error.error_description || error.message);
      } finally {
        setLoading(false);
      }
    };



    return (
      <>
        <Header session={session} />
      <div className="App">
        <ChatwootWidget />
      </div>
      
        <div>
          <h1 className="heading"><center>Brawl Stars Tips</center></h1>
        </div>
        <div className="flex-container">
          <div className="flex-child" align ="center">
            <iframe
              width="1000"
              height="500"
              src={link}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="Embedded youtube"
            />
          </div>
          
        </div>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <Footer />
      </>
    );
}
export default VideoPage;