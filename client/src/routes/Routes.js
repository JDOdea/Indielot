import { Route, Routes } from "react-router-dom";
import Landing from "../pages/landing/layouts";
import Login from "../components/auth/Login";
import { useContext } from "react";
import { UserContext } from "../providers/AuthContext";
import { Home } from "../components/home/Home";
import NavBar from "../components/nav/NavBar";
import Footer from "../components/footer/Footer";

export default function RoutePaths({}) {

    const userContext = useContext(UserContext);
    
    return (
        <Routes>
            {userContext.authenticated ? (
                <Route path="/">
                    <Route
                        index
                        element={
                            <>
                                <NavBar loggedInUser={userContext.user} setLoggedInUser={userContext.setUser} />
                                <Home loggedInUser={userContext.user} />
                                <Footer />
                            </>
                        }
                    />
                </Route>
            ) : (
                <Route path="/">
                    <Route index element={<Landing />} />
                    <Route path="login" element={<Login />} />
                </Route>
            )}
        </Routes>
    )
}