import { Route, Routes } from "react-router-dom";
import { AuthorizedRoute } from "./auth/AuthorizedRoute";
import { Home } from "./Home";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Productions from "./productions/Productions";
import NewProduction from "./productions/NewProduction";
import ProductionHub from "./productions/ProductionHub";
import { useState } from "react";

export default function ApplicationViews({ loggedInUser, setLoggedInUser }) {
    const [production, setProduction] = useState(null);


    return (
        <Routes>
            <Route path="/">
                <Route 
                    index
                    element={
                        <AuthorizedRoute loggedInUser={loggedInUser}>
                            <Home />
                        </AuthorizedRoute>
                    }
                />
                <Route path="productions">
                    <Route
                        index
                        element={
                            <AuthorizedRoute loggedInUser={loggedInUser}>
                                <Productions setProduction={setProduction}/>
                            </AuthorizedRoute>
                        }
                    />
                    <Route 
                        path="new"
                        element={
                            <AuthorizedRoute loggedInUser={loggedInUser}>
                                <NewProduction loggedInUser={loggedInUser}/>
                            </AuthorizedRoute>
                        }
                    />
                    <Route 
                        path=":title"
                        element={
                            <AuthorizedRoute loggedInUser={loggedInUser}>
                                <ProductionHub production={production}/>
                            </AuthorizedRoute>
                        }
                    />
                </Route>


                <Route
                    path="login"
                    element={<Login setLoggedInUser={setLoggedInUser} />}
                />
                <Route 
                    path="register"
                    element={<Register setLoggedInUser={setLoggedInUser} />}
                />
            </Route>
        </Routes>
    )
}