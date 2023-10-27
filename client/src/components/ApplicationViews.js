import { Route, Routes, useNavigate } from "react-router-dom";
import { AuthorizedRoute } from "./auth/AuthorizedRoute";
import { Home } from "./home/Home";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Productions from "./productions/Productions";
import NewProduction from "./productions/NewProduction";
import ProductionHub from "./productions/productionHub/ProductionHub";
import { createContext, useEffect, useState } from "react";
import EditProduction from "./productions/productionHub/EditProduction";
import UserProductions from "./productions/userProductions/UserProductions";
import UserProfile from "./profile/UserProfile";

export const ProductionContext = createContext(null);

export default function ApplicationViews({ loggedInUser, setLoggedInUser }) {
    const [production, setProduction] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        if (production) {
            localStorage.setItem("production", JSON.stringify(production));
            navigate(`/${production.title}`);
        }
    }, [production]);


    return (
        <Routes>
            <Route path="/">
                <Route 
                    index
                    element={
                        <AuthorizedRoute loggedInUser={loggedInUser}>
                            <ProductionContext.Provider value={{ production: production, setProduction: setProduction}}>
                                <Home loggedInUser={loggedInUser}/>
                            </ProductionContext.Provider>
                        </AuthorizedRoute>
                    }
                />
                    <Route path=":userName">
                        <Route 
                            index
                            element={
                                <AuthorizedRoute loggedInUser={loggedInUser}>
                                    <UserProfile loggedInUser={loggedInUser}/>
                                </AuthorizedRoute>
                            }/>
                        <Route
                            path="productions" 
                            element={
                                <AuthorizedRoute loggedInUser={loggedInUser}>
                                    <ProductionContext.Provider value={{ production: production, setProduction: setProduction}}>
                                        <UserProductions loggedInUser={loggedInUser}/>
                                    </ProductionContext.Provider>
                                </AuthorizedRoute>
                            }
                            />
                    </Route>
                    <Route path="productions">
                        <Route
                            index
                            element={
                                <AuthorizedRoute loggedInUser={loggedInUser}>
                                    <ProductionContext.Provider value={{ production: production, setProduction: setProduction}}>
                                        <Productions/>
                                    </ProductionContext.Provider>
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
                    </Route>
                    <Route path=":title">
                        <Route
                            index
                            element={
                                <AuthorizedRoute loggedInUser={loggedInUser}>
                                    <ProductionContext.Provider value={{ production: production, setProduction: setProduction}}>
                                        <ProductionHub loggedInUser={loggedInUser}/>
                                    </ProductionContext.Provider>
                                </AuthorizedRoute>
                            }
                        />
                        <Route 
                            path="edit"
                            element={
                                <AuthorizedRoute loggedInUser={loggedInUser}>
                                    <ProductionContext.Provider value={{ production: production, setProduction: setProduction}}>
                                        <EditProduction loggedInUser={loggedInUser} production={production} setProduction={setProduction}/>
                                    </ProductionContext.Provider>
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