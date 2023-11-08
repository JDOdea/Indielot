import { createContext, useEffect, useState } from "react";
import userActions from "../utils/userActions";

export const UserContext = createContext(null);

export default function UserProvider({ children }) {
    const [user, setUser] = useState("");
    const [token, setToken] = useState("");
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        userActions.fetchUser()
            .then((res) => {
                if (res) {
                    setUser(res.profile);
                    setToken(res.token);
                    setAuthenticated(res !== null);  
                }
            })
    }, []);

    return (
        <UserContext.Provider
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
        </UserContext.Provider>
    )
}