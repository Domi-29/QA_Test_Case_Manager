import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { TestCaseProvider } from "./context/TestCaseContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <TestCaseProvider>
      <App />
    </TestCaseProvider>
  </React.StrictMode>,
);
