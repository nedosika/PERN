import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import {AuthProvider} from "./contexts/AuthContext";
import {SnackbarProvider} from 'notistack';
import TasksProvider from "./contexts/TasksContext";
import {DialogProvider} from "./contexts/DialogContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <SnackbarProvider>
        <AuthProvider>
            <TasksProvider>
                <DialogProvider>
                    <App/>
                </DialogProvider>
            </TasksProvider>
        </AuthProvider>
    </SnackbarProvider>
);

reportWebVitals();
