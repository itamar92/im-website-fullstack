import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import App from "./App";
import { UserContextProvider } from "./Services/UserContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  // <React.StrictMode>
  <UserContextProvider>
    <App />
  </UserContextProvider>
  /* </React.StrictMode> */
);
