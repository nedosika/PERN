import React from 'react';
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";

import {useAuthContext} from "../../contexts/AuthContext";
import ProtectedRoutes from "../ProtectedRoutes";
import Dashboard from "../../pages/Dashboard";
import Tasks from "../../pages/Tasks";
import SignIn from "../../pages/SignIn";
import SignUp from "../../pages/SignUp";
import {Backdrop, CircularProgress} from "@mui/material";

const AppRouter = () => {
    const {isAuth, isCheckingAuth} = useAuthContext();

    if (isCheckingAuth) return <Backdrop
        sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
        open
    >
        <CircularProgress color="inherit"/>
    </Backdrop>

    return (
        <BrowserRouter>
            <Routes>
                <Route
                    element={
                        <ProtectedRoutes isAllowed={isAuth} redirectPath="/signin"/>
                    }
                >
                    <Route path="/" element={<Dashboard/>}/>
                    <Route path="/dashboard" element={<Dashboard/>}/>
                    <Route path="/tasks" element={<Tasks/>}/>
                </Route>
                <Route
                    element={<ProtectedRoutes isAllowed={!isAuth} redirectPath="/"/>}
                >
                    <Route path="/signin" element={<SignIn/>}/>
                    <Route path="/signup" element={<SignUp/>}/>
                </Route>
                <Route path="*" element={<Navigate to="/"/>}/>
            </Routes>
        </BrowserRouter>
    );
};

export default AppRouter;