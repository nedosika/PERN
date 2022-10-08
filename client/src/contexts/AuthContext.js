import {createContext, useContext, useEffect, useState} from "react";
import {CONFIG} from "../config";
import {useSnackbar} from "notistack";

const AuthContext = createContext({});

export const useAuthContext = () => useContext(AuthContext);

const AuthProvider = ({children}) => {
    const {enqueueSnackbar} = useSnackbar();
    const [isAuth, setIsAuth] = useState(false);
    const [isCheckingAuth, setIsCheckingAuth] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        if (localStorage.getItem("accessToken")) {
            checkAuth();
        } else {
            setIsCheckingAuth(false);
        }
    }, []);

    const signIn = ({email, password}, redirect) => {
        setIsLoading(true);
        return fetch(`${CONFIG.API_URL}/api/users/signin`, {
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
                if (result.status === 201) {
                    localStorage.setItem("accessToken", result.data.accessToken);
                    setIsAuth(true);
                    redirect();
                }
                if (result.status === 400) {
                    enqueueSnackbar(result.message, {variant: 'error'});
                }
            })
            .catch((error) => {
                enqueueSnackbar(error.message, {variant: 'error'});
            })
            .finally(() => setIsLoading(false));
    };

    const signUp = ({email, password}) => {
        setIsLoading(true);
        fetch(`${CONFIG.API_URL}/api/users/signup`, {
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
                if (result.errors.length) {
                    setErrors(errors);
                } else {
                    localStorage.setItem("accessToken", result.data.accessToken);
                    setIsAuth(true);
                }
            })
            .catch((error) => {
                console.log(error.message);
                setErrors([{msg: error.message}]);
            })
            .finally(() => setIsLoading(false));
    };

    const signOut = () => {
        setIsLoading(true);
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
            })
            .finally(() => setIsLoading(false));
    };

    const checkAuth = () => {
        setIsCheckingAuth(true);
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
            .finally(() => setIsCheckingAuth(false));
    };

    return (
        <AuthContext.Provider
            value={{
                isAuth,
                isCheckingAuth,
                signIn,
                signUp,
                signOut,
                checkAuth,
                isLoading,
                errors,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
