import React from "react"; //instantiates React into proj
import ReactDOM from "react-dom"; // instantiates React into the DOM

import "react-toastify/dist/ReactToastify.css"; // imports react toastify styling file

import App from "./App"; // registers the app.js file

import "./_base.css"; // brings in styling file for base
import "./index.css"; // brings in styling file for index

ReactDOM.render(
  // enables DOM to read contents inside react app || how it will render
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  //react.strictMode fragment runs checks on app to catch potential problems
  document.getElementById("root") // w/out root, the react app will not render || root encapsulates code in container-like mode
);
