/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { CrossIcon, CircleIcon, RefreshIcon } from "../assets";
import { GameFinish } from "./index";
import "../styles/OfflineGame.css";

function OfflineGame({ player1Mark }) {
  const [gameFinish, setGameFinish] = useState(false);
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
    if (board[2] === board[6] && board[6] === board[8] && board[2] !== "-") {
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

  // TODO game win check
  // useEffect(() => {
  //   setInterval(() => {
  //     const game = checkGame();
  //     if (game === "x") {
  //       setGameFinish("x");
  //     } else if (game === "o") {
  //       setGameFinish("o");
  //     }
  //   }, 500);
  // }, []);

  const playMove = (cell) => {
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
        <div className="player1">{player1Mark}</div>
        <div className="matchCount"></div>
        <div className="player2">{player1Mark === "x" ? "o" : "x"}</div>
      </div>
    </div>
  );
}

export default OfflineGame;
