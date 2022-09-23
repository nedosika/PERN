import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { AuthProvider } from "./contexts/AuthContext";
import { SnackbarProvider } from 'notistack';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
      <SnackbarProvider>
          <AuthProvider>
              <App />
          </AuthProvider>
      </SnackbarProvider>
  </React.StrictMode>
);

reportWebVitals();
