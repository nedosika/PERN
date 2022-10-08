import React from 'react';
import {SnackbarProvider} from "notistack";
import AuthProvider from "../../contexts/AuthContext";
import TasksProvider from "../../contexts/TasksContext";
import DialogProvider from "../../contexts/DialogContext";

const AllProviders = ({children}) =>
    <SnackbarProvider>
        <AuthProvider>
            <TasksProvider>
                <DialogProvider>
                    {children}
                </DialogProvider>
            </TasksProvider>
        </AuthProvider>
    </SnackbarProvider>

export default AllProviders;