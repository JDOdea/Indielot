import { Route, Routes } from "react-router-dom";
import { AuthorizedRoute } from "./auth/AuthorizedRoute";

export default function ApplicationViews({ loggedInUser, setLoggedInUser }) {
    return (
        <Routes>
            <Route path="/">
                <Route 
                    index
                    element={
                        <AuthorizedRoute loggedInUser={loggedInUser}>

                        </AuthorizedRoute>
                    }
                />
            </Route>
        </Routes>
    )
}