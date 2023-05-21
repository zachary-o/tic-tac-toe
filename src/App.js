import { useState } from "react";

import "./App.css";

import VersusComputer from "./components/VersusComputer";
import VersusHuman from "./components/VersusHuman";

function App() {
  const [steps, setSteps] = useState([
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
  ]);
  const [player, setPlayer] = useState("X");
  const [mode, setMode] = useState(null);
  const [toggle, setToggle] = useState(true);

  const handleSetVsHumanMode = () => {
    setMode(true);
    setToggle(false);
  };

  const handleSetVsAIMode = () => {
    setMode(false);
    setToggle(false);
  };

  const renderGame = () => {
    if (mode) {
      return (
        <VersusHuman
          steps={steps}
          setSteps={setSteps}
          player={player}
          setPlayer={setPlayer}
          setToggle={setToggle}
          setMode={setMode}
        />
      );
    } else if (mode === false) {
      return (
        <VersusComputer
          steps={steps}
          setSteps={setSteps}
          player={player}
          setPlayer={setPlayer}
          setToggle={setToggle}
          setMode={setMode}
        />
      );
    }
  };

  console.log(mode, toggle);

  return (
    <div className="app-container">
      {toggle ? (
        <div className="toggle-container">
          <h1>
            Do you want to play with your friend or the super-enhanced AI Model
            v69?
          </h1>
          <div className="buttons-container">
            <button onClick={handleSetVsHumanMode}>
              Human VS Human
            </button>
            <button onClick={handleSetVsAIMode} >
              Human VS AI
            </button>
          </div>
        </div>
      ) : null}
      {renderGame()}
    </div>
  );
}

export default App;
