import React from "react";
import { Navigate, Outlet, Route } from "react-router-dom";

const ProtectedRoute = ({
                          isAllowed,
                          redirectPath = '/signin',
                          children,
                        }) => {
  if (!isAllowed) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;
