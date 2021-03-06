import { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

const initialState: MarkdownState = {
  text: `
  # Welcome to my React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:

Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\`
// this is multi-line code:

const anotherExample = () => {
  console.log('Hello World');
}
\`\`\`

You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.com), and
> Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | -------------
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.


1. And there are numbered lists too.
1. Use just 1s if you want!
1. And last but not least, let's not forget embedded images:

![React Logo w/ Text](https://goo.gl/Umyytc)

  `
};

export const CHANGE_TEXT = "CHANGE_TEXT";

type MarkdownState = {
  text: void | string
}

export const appReducer = (state = initialState, action: PayloadAction): MarkdownState => {
  switch (action.type) {
    case CHANGE_TEXT:
      return {
        text: action.payload
      };
    default:
      return state;
  }
};
