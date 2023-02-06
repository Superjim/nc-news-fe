import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { CheckboxProvider } from "./contexts/CheckboxContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <CheckboxProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </CheckboxProvider>
);
