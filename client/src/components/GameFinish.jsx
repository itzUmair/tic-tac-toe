import { CrossIcon, CircleIcon } from "../assets";

import "../styles/GameFinish.css";

function GameFinish({
  winner,
  setGameFinish,
  refreshBoard,
  setOnLandingPage,
  setOfflineGameBegin,
  setGameVsPlayer,
}) {
  return (
    <>
      <div className="gameFinishBgCover"></div>
      <div className="gameFinish">
        {winner === "draw" ? (
          <p>It&apos;s a draw</p>
        ) : (
          <p>
            {winner === "x" ? (
              <CrossIcon width="30" />
            ) : (
              <CircleIcon width="30" />
            )}
            got this round!
          </p>
        )}
        <div className="buttonContainer">
          <button
            onClick={() => {
              setGameFinish(false);
              setOnLandingPage(true);
              setOfflineGameBegin(false);
              setGameVsPlayer(false);
            }}
          >
            quit
          </button>
          <button
            onClick={() => {
              setGameFinish(false);
              refreshBoard();
            }}
          >
            rematch
          </button>
        </div>
      </div>
    </>
  );
}

export default GameFinish;
