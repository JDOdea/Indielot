import React from 'react';
import { createContext, useEffect, useState } from "react";
import { tryGetLoggedInUser } from "../services/Managers/AuthManager";

export const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
    const [user, setUser] = useState({});
    const [token, setToken] = useState("");
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        tryGetLoggedInUser().then((user) => {
            if (user && user.profile && user.token) {
                setUser(user.profile);
                setToken(user.token);
                setAuthenticated(user.profile !== null);
            }
        })
    }, []);

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                token,
                setToken,
                authenticated,
                setAuthenticated,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}