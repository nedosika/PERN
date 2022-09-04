import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Dashboard from "./components/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import { useAuthContext } from "./contexts/AuthContext";
import {useEffect} from "react";

function App() {
  const { isAuth, checkAuth, isLoading } = useAuthContext();

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      checkAuth();
    }
  }, []);

  if(isLoading)
      return <div>Loading...</div>

  return (
    <BrowserRouter>
      <Routes>
        {/*<Route path="/" element={<Dashboard/>}/>*/}
        <Route
          element={
            <ProtectedRoute isAllowed={isAuth} redirectPath="signin">
              <Dashboard />
            </ProtectedRoute>
          }
          path="/"
        />
        <Route
          element={
            <ProtectedRoute isAllowed={!isAuth} redirectPath="/">
              <SignIn />
            </ProtectedRoute>
          }
          path="/signin"
        />
        <Route path="/signup" element={<SignUp />} />
        <Route path="*" element={<Navigate to="/signin" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
