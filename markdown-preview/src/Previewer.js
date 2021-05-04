import marked from "marked";
import dompurify from "dompurify";
import { useSelector } from "react-redux";

export const selectText = (state) => state.text;

marked.setOptions({
  breaks: true
});

export const Previewer = () => {
  const raw = useSelector(selectText);
  const markdown = marked(raw);

  console.log(markdown);

  const purified = dompurify.sanitize(markdown);

  return (
    <div id="preview" dangerouslySetInnerHTML={{ __html: purified }}></div>
  );
};
