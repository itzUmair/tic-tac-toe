import { useState } from "react";
import { LandingComponent, TurnSelector } from "./components";

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
      {gameVsPlayer && (
        <TurnSelector
          player1Mark={player1Mark}
          setPlayer1Mark={setPlayer1Mark}
        />
      )}
    </main>
  );
}

export default App;
