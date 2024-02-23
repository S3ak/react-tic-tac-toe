import "./App.css";

import { useState } from "react";

export function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

export function Board({ xIsNext, squares, onPlay }) {
  const winner = calculateWinner(squares);
  let status;

  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  const handleOnSquareClick = (squareNumber) => {
    const newSquares = [...squares];

    // NOTE: We stop the game if there's a winner.
    if (newSquares[squareNumber] || calculateWinner(newSquares)) {
      return;
    }

    if (xIsNext) {
      newSquares[squareNumber] = "X";
    } else {
      newSquares[squareNumber] = "O";
    }

    onPlay(newSquares);
  };

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square
          onSquareClick={() => handleOnSquareClick(0)}
          value={squares[0]}
        />
        <Square
          onSquareClick={() => handleOnSquareClick(1)}
          value={squares[1]}
        />
        <Square
          onSquareClick={() => handleOnSquareClick(2)}
          value={squares[2]}
        />
      </div>
      <div className="board-row">
        <Square
          onSquareClick={() => handleOnSquareClick(3)}
          value={squares[3]}
        />
        <Square
          onSquareClick={() => handleOnSquareClick(4)}
          value={squares[4]}
        />
        <Square
          onSquareClick={() => handleOnSquareClick(5)}
          value={squares[5]}
        />
      </div>
      <div className="board-row">
        <Square
          onSquareClick={() => handleOnSquareClick(6)}
          value={squares[6]}
        />
        <Square
          onSquareClick={() => handleOnSquareClick(7)}
          value={squares[7]}
        />
        <Square
          onSquareClick={() => handleOnSquareClick(8)}
          value={squares[8]}
        />
      </div>
    </>
  );
}

function Game() {
  // This is to determine if it's X's (Player 1) turn or O's (Player 2) turn.
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  console.warn("history >>>", history);
  console.log("history last move", history[history.length - 1]);

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  const jumpTo = (nextMove) => {
    setCurrentMove(nextMove);
  };

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = "Go to move #" + move;
    } else {
      description = "Go to game start";
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <h1>Tic Tac Toe</h1>
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  return null;
}

export default Game;
