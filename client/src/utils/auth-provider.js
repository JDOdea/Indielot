import React, { useContext, useEffect, useState } from "react";
import { tryGetLoggedInUser } from "../managers/authManager";

const defaultState = { isLoggedIn: false };

export const authContext = React.createContext(defaultState);

const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        tryGetLoggedInUser().then((res) => {
            if (res.status === 200) {
                setIsLoggedIn(true);
            }
        })
    }, []);

    return (
        <authContext.Provider value={{ isLoggedIn }}>
            {children}
        </authContext.Provider>
    );
};

export const useAuthDetection = () => {
    const { isLoggedIn } = useContext(authContext);
    return isLoggedIn;
};

export default ({ element }) => <AuthProvider>{element}</AuthProvider>;