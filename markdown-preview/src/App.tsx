import "./styles.css";
import "./Editor";
import "./Previewer";
import { Editor } from "./Editor";
import { Previewer } from "./Previewer";
import React from 'react';

export default function App() {
  return (
    <div className="App">
      <Editor />
      <Previewer />
    </div>
  );
}
