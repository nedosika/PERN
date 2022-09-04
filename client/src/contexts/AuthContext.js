import { createContext, useContext, useState } from "react";
import {CONFIG} from "../config";

const auth = !!localStorage.getItem('accessToken');

const AuthContext = createContext({});

export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(auth);
  const [isLoading, setIsLoading] = useState(false);

  const signIn = ({ email, password }) => {
    fetch(`${CONFIG.API_URL}/api/users/signin`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        localStorage.setItem("accessToken", result.data.accessToken);
        setIsAuth(true);
      });
  };

  const signOut = () => {
    fetch(`${CONFIG.API_URL}/api/users/signout`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
    })
      .then((response) => response.json())
      .then((result) => {
        localStorage.removeItem("accessToken");
        setIsAuth(false);
      });
  };

  const checkAuth = () => {
    setIsLoading(true);
    fetch(`${CONFIG.API_URL}/api/users/refresh`, {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((result) => {
        localStorage.setItem("accessToken", result.data.accessToken);
        setIsAuth(true);
      })
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
  };

  return (
    <AuthContext.Provider value={{ isAuth, signIn, signOut, checkAuth, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
