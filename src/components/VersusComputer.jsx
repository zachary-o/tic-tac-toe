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
  };

  return (
    <div className="game-container">
      {isWin && <Confetti />}
      <h1>{titleText()}</h1>
      <div className="board">
        <div className="board-row">
          <p onClick={() => handleSquareClick(0)}>{steps[0]}</p>
          <p onClick={() => handleSquareClick(1)}>{steps[1]}</p>
          <p onClick={() => handleSquareClick(2)}>{steps[2]}</p>
        </div>
        <div className="board-row">
          <p onClick={() => handleSquareClick(3)}>{steps[3]}</p>
          <p onClick={() => handleSquareClick(4)}>{steps[4]}</p>
          <p onClick={() => handleSquareClick(5)}>{steps[5]}</p>
        </div>
        <div className="board-row">
          <p onClick={() => handleSquareClick(6)}>{steps[6]}</p>
          <p onClick={() => handleSquareClick(7)}>{steps[7]}</p>
          <p onClick={() => handleSquareClick(8)}>{steps[8]}</p>
        </div>
      </div>
      <div>
        <button onClick={handleNewGame}>New Game</button>
        <button onClick={() => handleSetToggle()}>Change Mode</button>
      </div>
    </div>
  );
};
export default VersusComputer;
