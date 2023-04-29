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
      {offlineGameBegin && <OfflineGame player1Mark={player1Mark} />}
    </main>
  );
}

export default App;
