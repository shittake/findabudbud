import * as React from "react";
import Header from "../Header";

const VideoPage = ({ session }) => {
    return (
      <div>
        <Header session={session} />
        <div>
          <h1 className="heading"><center>Brawl Stars Tips</center></h1>
        </div>
        <div className="flex-container">
          <div className="flex-child">
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
      </div>
    );
}
export default VideoPage;