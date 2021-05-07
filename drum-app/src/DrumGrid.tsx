import DrumPad from "./DrumPad";
import Display from "./Display";
import React from "react";
import { useState } from "react";

const DrumGrid = () => {
  const keys = ["Q", "W", "E", "A", "S", "D", "Z", "X", "C"];

  const types: { [key: string]: string } = {
    Q: "Heater-1",
    W: "Heater-2",
    E: "Heater-3",
    A: "Heater-4",
    S: "Clap",
    D: "Open-HH",
    Z: "Kick-n'-Hat",
    X: "Kick",
    C: "Closed-HH"
  };

  const [message, setMessage] = useState("");

  const onChange = (event: React.SyntheticEvent, letter: string) => {
    event.preventDefault();
    setMessage(types[letter]);
  };

  const handleKeyPress = (
    event: React.KeyboardEvent
  ) => {
    const keyPressed = event.key.toUpperCase(); 
    if(types[keyPressed]){
      const element = document.getElementById(`main${keyPressed}`);
      element?.dispatchEvent(new MouseEvent('click', {
        view: window,
        bubbles: true,
        cancelable: true,
        buttons: 1
    }
    ));
    }
  }

  return (
    <div tabIndex={0} onKeyDown={handleKeyPress}>
      <h1>DrumGrid</h1>
      <div>
        {keys.map((key) => (
          <div id={`${key}-outer`} key={key} onClick={(event) => onChange(event, key)}>
            <DrumPad value={key} />
          </div>
        ))}
      </div>
      <Display message={message} />
    </div>
  );
};
export default DrumGrid;
