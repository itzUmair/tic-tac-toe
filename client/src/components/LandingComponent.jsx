/* eslint-disable react/prop-types */
import "../styles/LandingComponent.css";

function LandingComponent({ setOnLandingPage, setGameVsPlayer, setGameVsCpu }) {
  return (
    <div className="landingComponentContainer">
      <h1 className="gameTitle">tic tac toe</h1>
      <div className="buttonContainer">
        <button
          onClick={() => {
            setOnLandingPage(false);
            setGameVsPlayer(true);
          }}
        >
          new game (vs player)
        </button>
        <button
          onClick={() => {
            setOnLandingPage(false);
            setGameVsCpu(true);
          }}
        >
          new game (vs CPU)
        </button>
      </div>
    </div>
  );
}

export default LandingComponent;
