import * as React from "react";

class TestPage extends React.Component {
    
  render() {
    return (
      <div>
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
}
export default TestPage;