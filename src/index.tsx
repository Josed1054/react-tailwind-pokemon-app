import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { ROUTES } from "./setup/routes-manager";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(<React.StrictMode>{ROUTES()}</React.StrictMode>);
