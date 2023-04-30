import { useState } from "react";
import { LandingComponent, TurnSelector, OfflineGame } from "./components";

function App() {
  const [onLandingPage, setOnLandingPage] = useState(true);
  const [gameVsPlayer, setGameVsPlayer] = useState(false);
  const [gameVsCpu, setGameVsCpu] = useState(false);
  const [gameOnline, setGameOnline] = useState(false);

  const [player1Mark, setPlayer1Mark] = useState("x");
  const [offlineGameBegin, setOfflineGameBegin] = useState(false);
  const [cpuGameBegin, setCpuGameBegin] = useState(false);
  const [onlineGameBegin, setOnlineGameBegin] = useState(false);

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
          setGameOnline={setGameOnline}
        />
      )}
      {gameVsPlayer && !offlineGameBegin && (
        <TurnSelector
          player1Mark={player1Mark}
          setPlayer1Mark={setPlayer1Mark}
          setOfflineGameBegin={setOfflineGameBegin}
        />
      )}
      {offlineGameBegin && !onLandingPage && (
        <OfflineGame
          player1Mark={player1Mark}
          setOnLandingPage={setOnLandingPage}
          offlineGameData={offlineGameData}
          setOfflineGameData={setOfflineGameData}
          setOfflineGameBegin={setOfflineGameBegin}
          setGameVsPlayer={setGameVsPlayer}
        />
      )}
    </main>
  );
}

export default App;
