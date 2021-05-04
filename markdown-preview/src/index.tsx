import { StrictMode } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import React from 'react';

import App from "./App";

import store from "./store";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <Provider store={store}>
    <StrictMode>
      <App />
    </StrictMode>
  </Provider>,
  rootElement
);
