import { createContext, useContext, useState } from "react";

const AuthContext = createContext({});

export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);

  const signIn = ({ email, password }) => {
    fetch("http://localhost:5000/api/users/signin", {
      method: "POST",
      credentials: 'include',
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
        setIsAuth(true);
      });
  };

  const signOut = () => {
    fetch("http://localhost:5000/api/users/signout", {
      method: "POST",
      credentials: 'include',
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
    }).then((response) => response.json()).then((result) => {
      setIsAuth(false)
    });
  };

  return (
    <AuthContext.Provider value={{ isAuth, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
