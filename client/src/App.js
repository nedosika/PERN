import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Dashboard from "./components/Dashboard";
import ProtectedRoutes from "./components/ProtectedRoutes";
import { useAuthContext } from "./contexts/AuthContext";
import { useEffect } from "react";

function App() {
  const { isAuth, checkAuth, isCheckingAuth } = useAuthContext();

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      checkAuth();
    }
  }, []);

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
        </Route>
        <Route
          element={<ProtectedRoutes isAllowed={!isAuth} redirectPath="/" />}
        >
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
