import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { selectText } from "./Previewer";
import { CHANGE_TEXT } from "./reducer";

export const Editor = () => {
  const [currText, setText] = useState(useSelector(selectText));
  const dispatch = useDispatch();

  const handleChange = (val) => {
    setText(val);
    console.log(val);
    dispatch({
      type: CHANGE_TEXT,
      payload: val
    });
  };

  return (
    <div>
      <h1>Enter Text Here:</h1>
      <textarea
        id="editor"
        value={currText}
        onChange={(event) => handleChange(event.target.value)}
      />
    </div>
  );
};
