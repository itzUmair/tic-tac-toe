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
  gameMode,
  setGameVsCpu,
  smartAi,
}) {
  const [gameFinish, setGameFinish] = useState(false);
  const [winCondition, setWinCondition] = useState(false);

  let aiTurn;
  let aiPlayer = player1Mark === "x" ? "o" : "x";
  let gameScore = offlineGameData;
  console.log(smartAi);
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

  const turnDecider = () => {
    if (player1Mark === "o" && turnNumber() % 2 === 0) {
      aiTurn = true;
    } else if (player1Mark === "x" && turnNumber() % 2 !== 0) {
      aiTurn = true;
    } else {
      aiTurn = false;
    }
  };

  const aiMove = () => {
    const availableMoves = board.map((cell, cellno) => {
      if (cell === "-") return cellno;
    });
    const move = availableMoves.filter((move) => move !== undefined);
    return move[Math.floor(Math.random() * 9)];
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
      setWinCondition(6);
      return board[0];
    }
    if (board[3] === board[4] && board[4] === board[5] && board[3] !== "-") {
      setWinCondition(5);
      return board[3];
    }
    if (board[6] === board[7] && board[7] === board[8] && board[6] !== "-") {
      setWinCondition(4);
      return board[6];
    }
    // verticle
    if (board[0] === board[3] && board[3] === board[6] && board[0] !== "-") {
      setWinCondition(1);
      return board[0];
    }
    if (board[1] === board[4] && board[4] === board[7] && board[1] !== "-") {
      setWinCondition(2);
      return board[1];
    }
    if (board[2] === board[5] && board[5] === board[8] && board[2] !== "-") {
      setWinCondition(3);
      return board[2];
    }
    // diagonal
    if (board[0] === board[4] && board[4] === board[8] && board[0] !== "-") {
      setWinCondition(7);
      return board[0];
    }
    if (board[2] === board[4] && board[4] === board[6] && board[2] !== "-") {
      setWinCondition(8);
      return board[2];
    }
    return 0;
  };
  const minimax = (board, depth, isMaximizing) => {
    console.log(board);
    if (gameFinish) {
      if (gameFinish === "draw") {
        return 0;
      } else if (gameFinish === player1Mark) {
        return -1;
      } else {
        return 1;
      }
    } else {
      if (isMaximizing) {
        let bestScore = -1000;
        for (let i = 0; i < 9; i++) {
          if (board[i] === "-") {
            board[i] = aiPlayer;
            let score = minimax(board, depth + 1, !isMaximizing);
            board[i] === "-";
            bestScore = Math.max(score, bestScore);
          }
        }
        return bestScore;
      } else {
        let bestScore = 1000;
        for (let i = 0; i < 9; i++) {
          if (board[i] === "-") {
            board[i] = player1Mark;
            let score = minimax(board, depth + 1, !isMaximizing);
            board[i] === "-";
            bestScore = Math.min(score, bestScore);
          }
        }
        return bestScore;
      }
    }
  };

  const bestMove = () => {
    let newBoard = [...board];
    let bestScore = -1000;
    let move;
    let isMaximizing = player1Mark === "x" ? false : true;
    for (let i = 0; i < 9; i++) {
      if (board[i] === "-") {
        newBoard[i] = aiPlayer;
        let score = minimax(newBoard, 0, isMaximizing);
        newBoard[i] = "-";
        if (score > bestScore) {
          bestScore = score;
          move = i;
        }
      }
    }
    return move;
  };

  const playAiMove = () => {
    const newBoard = [...board];
    if (smartAi) {
      let move = bestMove();
      newBoard[move] = turnNumber() % 2 === 0 ? "x" : "o";
      setBoard(newBoard);
      return;
    }
    newBoard[aiMove()] = turnNumber() % 2 === 0 ? "x" : "o";
    setBoard(newBoard);
    return;
  };

  useEffect(() => {
    turnDecider();
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
    if (gameMode === "ai" && aiTurn && turnNumber() < 9 && game === 0) {
      playAiMove();
    }
  }, [board]);

  const playMove = (cell) => {
    const newBoard = [...board];
    if (gameFinish) return;
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
        {winCondition === 1 && <span className="winLine winLine1"></span>}
        {winCondition === 2 && <span className="winLine winLine2"></span>}
        {winCondition === 3 && <span className="winLine winLine3"></span>}
        {winCondition === 4 && <span className="winLine winLine4"></span>}
        {winCondition === 5 && <span className="winLine winLine5"></span>}
        {winCondition === 6 && <span className="winLine winLine6"></span>}
        {winCondition === 7 && <span className="winLine winLine7"></span>}
        {winCondition === 8 && <span className="winLine winLine8"></span>}
        {board.map((cell, key) => (
          <span className="cell" key={key} onClick={() => playMove(key)}>
            {markCell(cell)}
          </span>
        ))}
      </div>
      <div className="scoreContainer">
        <div className="player player1">
          <span>
            {gameMode === "ai" ? <p>You</p> : <p>player 1</p>}
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
            {gameMode === "ai" ? <p>CPU</p> : <p>player 2</p>}
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
          setGameVsCpu={setGameVsCpu}
          setWinCondition={setWinCondition}
        />
      )}
    </div>
  );
}

export default OfflineGame;
