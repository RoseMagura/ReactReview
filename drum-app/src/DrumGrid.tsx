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

  return (
    <div>
      <h1>DrumGrid</h1>
      <div>
        {keys.map((key) => (
          <div key={key} onClick={(event) => onChange(event, key)}>
            <DrumPad value={key} />
          </div>
        ))}
      </div>
      <Display message={message} />
    </div>
  );
};
export default DrumGrid;
