/* eslint-disable react/prop-types */
import "../styles/TurnSelector.css";

function TurnSelector({ player1Mark, setPlayer1Mark }) {
  return (
    <div className="turnSelectorContainer">
      <h1 className="gameTitle secondary">tic tac toe</h1>
      <section className="turnOptionContainer">
        <h2>pick player 1&apos;s mark</h2>
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
        <button>go!</button>
      </section>
    </div>
  );
}

export default TurnSelector;
