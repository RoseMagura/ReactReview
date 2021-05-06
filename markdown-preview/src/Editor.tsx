import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { selectText } from "./Previewer";
import { CHANGE_TEXT } from "./reducer";
import React from 'react';
import TextareaAutosize from 'react-textarea-autosize';

export const Editor = () => {
  const [currText, setText] = useState(useSelector(selectText));
  const dispatch = useDispatch();

  const handleChange = (val: string) => {
    setText(val);
    dispatch({
      type: CHANGE_TEXT,
      payload: val
    });
  };

  return (
    <div>
      <h1>Enter Text Here:</h1>
      <TextareaAutosize
        id="editor"
        value={String(currText)}
        onChange={(event) => handleChange(event.target.value)}
      />
    </div>
  );
};
