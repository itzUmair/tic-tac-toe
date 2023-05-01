import { useState } from "react";
import { LandingComponent, TurnSelector, OfflineGame } from "./components";

function App() {
  const [onLandingPage, setOnLandingPage] = useState(true);
  const [gameVsPlayer, setGameVsPlayer] = useState(false);
  const [gameVsCpu, setGameVsCpu] = useState(false);

  const [player1Mark, setPlayer1Mark] = useState("x");
  const [offlineGameBegin, setOfflineGameBegin] = useState(false);
  const [smartAi, setSmartAi] = useState(false);

  let offlineGameData = {
    p1: 0,
    draw: 0,
    p2: 0,
  };

  const setOfflineGameData = (obj) => {
    offlineGameData = obj;
  };
  return (
    <main>
      {onLandingPage && (
        <LandingComponent
          setOnLandingPage={setOnLandingPage}
          setGameVsPlayer={setGameVsPlayer}
          setGameVsCpu={setGameVsCpu}
        />
      )}
      {gameVsPlayer && !offlineGameBegin && (
        <TurnSelector
          player1Mark={player1Mark}
          setPlayer1Mark={setPlayer1Mark}
          setOfflineGameBegin={setOfflineGameBegin}
          gameMode="offline"
          smartAi={smartAi}
          setSmartAi={setSmartAi}
        />
      )}
      {offlineGameBegin && !onLandingPage && !gameVsCpu && (
        <OfflineGame
          player1Mark={player1Mark}
          setOnLandingPage={setOnLandingPage}
          offlineGameData={offlineGameData}
          setOfflineGameData={setOfflineGameData}
          setOfflineGameBegin={setOfflineGameBegin}
          setGameVsPlayer={setGameVsPlayer}
          gameMode="offline"
          setGameVsCpu={setGameVsCpu}
          smartAi={smartAi}
        />
      )}
      {gameVsCpu && !offlineGameBegin && (
        <TurnSelector
          player1Mark={player1Mark}
          setPlayer1Mark={setPlayer1Mark}
          setOfflineGameBegin={setOfflineGameBegin}
          gameMode="ai"
          smartAi={smartAi}
          setSmartAi={setSmartAi}
        />
      )}
      {offlineGameBegin && !onLandingPage && !gameVsPlayer && (
        <OfflineGame
          player1Mark={player1Mark}
          setOnLandingPage={setOnLandingPage}
          offlineGameData={offlineGameData}
          setOfflineGameData={setOfflineGameData}
          setOfflineGameBegin={setOfflineGameBegin}
          setGameVsPlayer={setGameVsPlayer}
          gameMode="ai"
          setGameVsCpu={setGameVsCpu}
          smartAi={smartAi}
        />
      )}
    </main>
  );
}

export default App;
