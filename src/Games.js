import React from 'react';
import { useState, useEffect } from "react";

  const [brawl_stars, setBrawlStars] = useState(false);
  const [mobile_legends, setMobileLegends] = useState(false);

 const handleMobileLegendsChange = () => {
    return setMobileLegends(!mobile_legends);
  };

  const handleBrawlStarsChange = () => {
    return setBrawlStars(!brawl_stars);
  }

const Games = (clickGames, mobile_legends, brawl_stars) => {
	setMobileLegends(mobile_legends);
	setBrawlStars(brawl_stars);

	return (
		<>
			(clickGames) ? <>
	    {/* Toggle button to change preference for Brawl Stars */}
	      <div>
	        <button onClick={() => handleBrawlStarsChange()}>
	          Brawl Stars?
	        </button>
	        {brawl_stars
	          ? " Yes I love Brawl Stars!"
	          : " Not really interested"}
	      </div>

	      <br></br>

	    {/* Toggle button to change preference for Mobile Legends */}
	      <div>
	        <button onClick={() => handleMobileLegendsChange()}>
	          Mobile legends?
	        </button>
	        {mobile_legends
	          ? " Yes I love Mobile Legends!"
	          : " Not really interested"}
	      </div>

	      <br></br>
	    </> 
	    :
	    <>
	      <div2>
	        Click "Games" if you would like to see the different game subcategories!
	      </div2>
	    </>
	  </>
	);
}

export default Games;