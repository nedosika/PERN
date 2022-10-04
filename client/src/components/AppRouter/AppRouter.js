import React from 'react';
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";

import {useAuthContext} from "../../contexts/AuthContext";
import ProtectedRoutes from "../ProtectedRoutes";
import Dashboard from "../../pages/Dashboard";
import Tasks from "../../pages/Tasks";
import SignIn from "../../pages/SignIn";

const AppRouter = () => {
    const { isAuth, isCheckingAuth } = useAuthContext();

    if (isCheckingAuth) return <div>Loading...</div>;

    return (
        <BrowserRouter>
            <Routes>
                <Route
                    element={
                        <ProtectedRoutes isAllowed={isAuth} redirectPath="/signin" />
                    }
                >
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/tasks" element={<Tasks />} />
                </Route>
                <Route
                    element={<ProtectedRoutes isAllowed={!isAuth} redirectPath="/" />}
                >
                    <Route path="/signin" element={<SignIn />} />
                </Route>
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRouter;