import React from "react";
import { Navigate, Outlet, Route } from "react-router-dom";

const ProtectedRoutes = ({
                            isAllowed,
                            redirectPath,
                            children,
                        }) => {
    if (!isAllowed) {
        return <Navigate to={redirectPath} replace />;
    }

    return children ? children : <Outlet />;
};

export default ProtectedRoutes;
