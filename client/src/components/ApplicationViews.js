import { Route, Routes, useNavigate } from "react-router-dom";
import { AuthorizedRoute } from "./auth/AuthorizedRoute";
import { Home } from "./Home";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Productions from "./productions/Productions";
import NewProduction from "./productions/NewProduction";
import ProductionHub from "./productions/productionHub/ProductionHub";
import { createContext, useEffect, useState } from "react";
import EditProduction from "./productions/productionHub/EditProduction";

export const ProductionContext = createContext(null);

export default function ApplicationViews({ loggedInUser, setLoggedInUser }) {
    const [production, setProduction] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        if (production) {
            sessionStorage.setItem("production", JSON.stringify(production));
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
                            <Home />
                        </AuthorizedRoute>
                    }
                />
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