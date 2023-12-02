import { Route, Routes } from "react-router-dom";
import Landing from "../pages/landing/Landing.js";
import Login from "../pages/login/Login.js"
import Signup from "../pages/signup/Signup.js"
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext.js";
import UserViews from "./views/UserViews.js";
import Navbar from "../layouts/navbar/Navbar.js";
import Footer from "../components/footer/Footer.js";

export default function RoutePaths({}) {

    const userContext = useContext(AuthContext);
    
    return (
        <Routes>
            {userContext.authenticated ? (
                <Route path="*" element={
                    <>
                        <Navbar />
                        <UserViews />
                        <Footer />
                    </>
                }/>
            ) : (
                <Route path="/">
                    <Route index element={<Landing />} />
                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Signup />} />
                </Route>
            )}
        </Routes>
    )
}