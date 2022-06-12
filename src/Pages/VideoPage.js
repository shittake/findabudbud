import * as React from "react";
import Header from "../Header";
import Footer from "../Footer";
import ChatwootWidget from "../chatwoot.js";

const VideoPage = ({ session }) => {
    return (
      <div>
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
              src={`https://www.youtube.com/embed/G_wxQe2Litw`}
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
      </div>
    );
}
export default VideoPage;