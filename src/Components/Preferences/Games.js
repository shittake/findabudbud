import { RedButton } from "../Buttons/ColouredButtons";

function Games() {
  return (
    <>
      {/* Toggle button to change preference for Brawl Stars */}
      <div>
        <RedButton
          onClick={() => handleBrawlStarsChange()}
          variant={brawlStarsVariant}
          text="Brawl Stars"
        ></RedButton>
      </div>
      <br></br>

      {/* Toggle button to change preference for Mobile Legends */}
      <div>
        <RedButton
          variant={mobileLegendsVariant}
          onClick={() => handleMobileLegendsChange()}
          text="Mobile legends"
        ></RedButton>
      </div>
      <br></br>
    </>
  );
}

export default Games;
