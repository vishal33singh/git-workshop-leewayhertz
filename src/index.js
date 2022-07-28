import React from "react";
import ReactDOM from "react-dom/client";
import Routes from "./routes";
import store from "./store.js";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import * as serviceWorker from "./serviceWorker";
import "./assets/styles/custom.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <Routes component={Routes} />
    </Provider>
  </BrowserRouter>
);

serviceWorker.unregister();
