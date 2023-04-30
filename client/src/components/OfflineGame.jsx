/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { CrossIcon, CircleIcon, RefreshIcon } from "../assets";
import { GameFinish } from "./index";
import "../styles/OfflineGame.css";

function OfflineGame({
  player1Mark,
  setOnLandingPage,
  offlineGameData,
  setOfflineGameData,
  setOfflineGameBegin,
  setGameVsPlayer,
}) {
  const [gameFinish, setGameFinish] = useState(false);
  let gameScore = offlineGameData;

  const [board, setBoard] = useState([
    "-",
    "-",
    "-",
    "-",
    "-",
    "-",
    "-",
    "-",
    "-",
  ]);

  const turnNumber = () => {
    let turn = 0;
    board.forEach((cell) => cell !== "-" && turn++);
    return turn;
  };

  const playerMarkRatio = {
    1024: "55",
    768: "45",
    0: "35",
  };

  const markCell = (cell) => {
    const screenSize = screen.width;
    if (cell === "x") {
      if (1024 <= screenSize) {
        return <CrossIcon width={playerMarkRatio[1024]} />;
      } else if (768 <= screenSize && screenSize < 1024) {
        return <CrossIcon width={playerMarkRatio[768]} />;
      } else if (0 < screenSize && screenSize < 768) {
        return <CrossIcon width={playerMarkRatio[0]} />;
      }
    } else if (cell === "o") {
      if (1024 <= screenSize) {
        return <CircleIcon width={playerMarkRatio[1024]} />;
      } else if (768 <= screenSize && screenSize < 1024) {
        return <CircleIcon width={playerMarkRatio[768]} />;
      } else if (0 < screenSize && screenSize < 768) {
        return <CircleIcon width={playerMarkRatio[0]} />;
      }
    } else {
      return;
    }
  };

  const refreshBoard = () => {
    setBoard(["-", "-", "-", "-", "-", "-", "-", "-", "-"]);
    setGameFinish(false);
  };

  const checkGame = () => {
    // horizontal
    if (board[0] === board[1] && board[1] === board[2] && board[0] !== "-") {
      return board[0];
    }
    if (board[3] === board[4] && board[4] === board[5] && board[3] !== "-") {
      return board[3];
    }
    if (board[6] === board[7] && board[7] === board[8] && board[6] !== "-") {
      return board[6];
    }
    // verticle
    if (board[0] === board[3] && board[3] === board[6] && board[0] !== "-") {
      return board[0];
    }
    if (board[1] === board[4] && board[4] === board[7] && board[1] !== "-") {
      return board[1];
    }
    if (board[2] === board[5] && board[5] === board[8] && board[2] !== "-") {
      return board[2];
    }
    // diagonal
    if (board[0] === board[4] && board[4] === board[8] && board[0] !== "-") {
      return board[0];
    }
    if (board[2] === board[4] && board[4] === board[6] && board[2] !== "-") {
      return board[2];
    }
    return 0;
  };

  useEffect(() => {
    const game = checkGame();
    if (game !== 0) {
      if (game === "x" && player1Mark === "x") {
        setOfflineGameData({ ...gameScore, p1: gameScore.p1++ });
      } else if (game === "o" && player1Mark === "o") {
        setOfflineGameData({ ...gameScore, p1: gameScore.p1++ });
      } else if (game === "x" && player1Mark === "o") {
        setOfflineGameData({ ...gameScore, p2: gameScore.p2++ });
      } else if (game === "o" && player1Mark === "x") {
        setOfflineGameData({ ...gameScore, p2: gameScore.p2++ });
      }
      setGameFinish(game);
    } else if (game === 0 && turnNumber() === 9) {
      setOfflineGameData({ ...gameScore, draw: gameScore.draw++ });
      setGameFinish("draw");
    }
  }, [board]);
  const playMove = (cell) => {
    if (gameFinish) return;
    const newBoard = [...board];
    if (newBoard[cell] === "-") {
      newBoard[cell] = turnNumber() % 2 === 0 ? "x" : "o";
      setBoard(newBoard);
    }
  };

  return (
    <div className="gameBoard">
      <h1 className="gameTitle secondary">tic tac toe</h1>
      <div className="menuContainer">
        <span className="logo">
          <CrossIcon width="20" />
          <CircleIcon width="20" />
        </span>
        <span className="turnIndicator">
          Turn:
          {turnNumber() % 2 !== 0 ? (
            <CircleIcon width="20" />
          ) : (
            <CrossIcon width="20" />
          )}
        </span>
        <span className="refreshIcon" onClick={() => refreshBoard()}>
          <RefreshIcon width="30" />
        </span>
      </div>
      <div className="board">
        {board.map((cell, key) => (
          <span className="cell" key={key} onClick={() => playMove(key)}>
            {markCell(cell)}
          </span>
        ))}
      </div>
      <div className="scoreContainer">
        <div className="player player1">
          <span>
            <p>player 1</p>
            {player1Mark === "x" ? <CrossIcon /> : <CircleIcon />}
          </span>
          <p>{gameScore?.p1 || "0"}</p>
        </div>
        <div className="drawCount">
          <p>draws</p>
          <span>{gameScore?.draw || "0"}</span>
        </div>
        <div className="player player2">
          <span>
            <p>player 2</p>
            {player1Mark !== "x" ? <CrossIcon /> : <CircleIcon />}
          </span>
          <p>{gameScore?.p2 || "0"}</p>
        </div>
      </div>
      {gameFinish && (
        <GameFinish
          winner={gameFinish}
          setGameFinish={setGameFinish}
          refreshBoard={refreshBoard}
          setOnLandingPage={setOnLandingPage}
          setOfflineGameBegin={setOfflineGameBegin}
          setGameVsPlayer={setGameVsPlayer}
        />
      )}
    </div>
  );
}

export default OfflineGame;
