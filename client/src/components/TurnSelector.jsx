/* eslint-disable react/prop-types */
import "../styles/TurnSelector.css";

function TurnSelector({
  player1Mark,
  setPlayer1Mark,
  setOfflineGameBegin,
  gameMode,
  smartAi,
  setSmartAi,
}) {
  return (
    <div className="turnSelectorContainer">
      <h1 className="gameTitle secondary">tic tac toe</h1>
      <section className="turnOptionContainer">
        {gameMode === "ai" ? (
          <h2>pick your mark</h2>
        ) : (
          <h2>pick player 1&apos;s mark</h2>
        )}
        <div className="turnOptions">
          <span
            className={player1Mark === "x" ? "option active" : "option"}
            onClick={() => setPlayer1Mark("x")}
            tabIndex="0"
          >
            X
          </span>
          <span
            className={player1Mark === "o" ? "option active" : "option"}
            onClick={() => setPlayer1Mark("o")}
            tabIndex="0"
          >
            O
          </span>
        </div>
        <p className="turnHint">remember: x goes first</p>
        {false && gameMode === "ai" && (
          <div className="aiOptionContainer">
            <h2>select ai mode</h2>
            <div className="aiOptions">
              <span
                className={smartAi ? "option" : "option active"}
                onClick={() => setSmartAi(false)}
                tabIndex="0"
              >
                regular
              </span>
              <span
                className={smartAi ? "option active" : "option"}
                onClick={() => setSmartAi(true)}
                tabIndex="0"
              >
                impossible
              </span>
            </div>
          </div>
        )}
        <button onClick={() => setOfflineGameBegin(true)}>go!</button>
      </section>
    </div>
  );
}

export default TurnSelector;
