import marked from "marked";
import dompurify from "dompurify";
import { useSelector } from "react-redux";
import { RootState } from './store';
import React from 'react';

export const selectText = (state: RootState) => state.text;

marked.setOptions({
  breaks: true
});

export const Previewer = () => {
  const raw = useSelector(selectText);
  const markdown = marked(String(raw));

  const purified = dompurify.sanitize(markdown);

  return (
    <div id="preview" dangerouslySetInnerHTML={{ __html: purified }}></div>
  );
};
