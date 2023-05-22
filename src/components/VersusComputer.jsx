import { useState, useEffect } from "react";
import Confetti from "react-confetti";

const VersusComputer = ({
  steps,
  setSteps,
  player,
  setPlayer,
  setToggle,
  setMode,
}) => {
  const [isWin, setIsWin] = useState(false);

  let winner = null;

  const handleSquareClick = (index) => {
    if (winner) {
      return;
    }
    if (steps[index] === null) {
      const updatedSteps = [...steps];
      updatedSteps[index] = player;
      setSteps(updatedSteps);

      setPlayer(player === "X" ? "O" : "X");
    }
  };

  const computerMove = () => {
    const squaresArrayFiltered = steps.reduce((indexes, square, index) => {
      if (square === null) {
        indexes.push(index);
      }
      return indexes;
    }, []);

    if (squaresArrayFiltered.length > 0 && player === "O") {
      const randomIndex =
        squaresArrayFiltered[
          Math.floor(Math.random() * squaresArrayFiltered.length)
        ];
      handleSquareClick(randomIndex);
    }
  };

  setTimeout(computerMove, 1000);

  const checkWinner = () => {
    const winCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < winCombinations.length; i++) {
      const [a, b, c] = winCombinations[i];

      if (
        steps[a] === steps[b] &&
        steps[a] === steps[c] &&
        steps[a] &&
        steps[b] &&
        steps[c]
      ) {
        winner = steps[a];
      }
    }

    const filled = steps.every((el) => el);
    if (filled && !winner) {
      winner = "Draw";
    }
  };
  checkWinner();

  const titleText = () => {
    if (!winner) {
      return `Next player is ${player}`;
    }
    if (winner === "Draw") {
      return "It's a draw";
    } 
    if (winner === "O") {
      return `The winner is 🤖`;
    } else {
      return `The winner is ${winner}`;
    }
  };
  
  const confetti = () => {
    if (winner && winner !== "Draw") {
      return setIsWin(true);
    }
    setIsWin(false);
  };

  useEffect(() => {
    confetti();
  }, [winner]);

  const handleNewGame = () => {
    setSteps(Array(9).fill(null));
    setPlayer("X");
    setIsWin(false);
  };

  const handleSetToggle = () => {
    setToggle(true);
    setMode(null);
    setSteps(Array(9).fill(null));
    setPlayer("X");
  };

  return (
    <div className="game-container">
      {isWin && <Confetti />}
      <h1>{titleText()}</h1>
      <div className="board">
        <div className="board-row">
          <button onClick={() => handleSquareClick(0)} disabled={player === "O"} className="square">
            {steps[0]}
          </button>
          <button onClick={() => handleSquareClick(1)} disabled={player === "O"} className="square">
            {steps[1]}
          </button>
          <button onClick={() => handleSquareClick(2)} disabled={player === "O"} className="square">
            {steps[2]}
          </button>
        </div>
        <div className="board-row">
          <button onClick={() => handleSquareClick(3)} disabled={player === "O"} className="square">
            {steps[3]}
          </button>
          <button onClick={() => handleSquareClick(4)} disabled={player === "O"} className="square">
            {steps[4]}
          </button>
          <button onClick={() => handleSquareClick(5)} disabled={player === "O"} className="square">
            {steps[5]}
          </button>
        </div>
        <div className="board-row">
          <button onClick={() => handleSquareClick(6)} disabled={player === "O"} className="square">
            {steps[6]}
          </button>
          <button onClick={() => handleSquareClick(7)} disabled={player === "O"} className="square">
            {steps[7]}
          </button>
          <button onClick={() => handleSquareClick(8)} disabled={player === "O"} className="square">
            {steps[8]}
          </button>
        </div>
      </div>
      <div>
        <button onClick={handleNewGame} className="select">
          New Game
        </button>
        <button onClick={() => handleSetToggle()} className="select">
          Change Mode
        </button>
      </div>
    </div>
  );
};
export default VersusComputer;
