import { useEffect, useState } from "react";
import { Route, useParams } from "react-router-dom";
import { fetchProductions } from "../managers/productionManager";
import { fetchUsers } from "../managers/userManager";
import UserProfile from "./profile/UserProfile";
import { ProductionContext } from "./ApplicationViews";
import ProductionHub from "./productions/productionHub/ProductionHub";

export default function ViewParamRouter({ loggedInUser, production, setProduction }) {
    const [users, setUsers] = useState([]);
    const [productions, setProductions] = useState([]);

    const { param } = useParams();

    useEffect(() => {
        fetchUsers().then(setUsers);
        fetchProductions().then(setProductions);
    }, []);

    const routeParam = () => {
        if (users.find((u) => (u.userName === param)))
        {
            return (
                <UserProfile loggedInUser={loggedInUser}/>
            )
        } else if (productions.find((p) => (p.title === param))) {
            return (
                <ProductionHub loggedInUser={loggedInUser} />
            )
        }
    }
    
    return (
        <>
            {routeParam()}
        </>
    )
}