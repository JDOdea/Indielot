import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchUsers } from "../../managers/userManager";
import { fetchProductions } from "../../managers/productionManager";
import EditProduction from "../productions/productionHub/EditProduction";

export default function ViewEditRouter({ loggedInUser, production, setProduction }) {
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
            return;
        } else {
            return (
                <EditProduction loggedInUser={loggedInUser} production={production} setProduction={setProduction}/>
            )
        }
    }

    return (
        <>
            {routeParam()}
        </>
    )
}