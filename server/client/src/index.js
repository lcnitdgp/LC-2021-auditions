import React from "react";
import ReactDOM from "react-dom";
import reduxThunk from "redux-thunk";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reducers from "./reducers";
import App from "./components/App";
import axios from "./config/axios";
import { composeWithDevTools } from "redux-devtools-extension";

window.axios = axios; //allow use of axios in front end termunal
// const backendUrl = process.env.REACT_APP_BACKEND_URL;

const store = createStore(
  reducers,
  {},
  composeWithDevTools(applyMiddleware(reduxThunk))
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
