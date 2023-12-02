import { useEffect, useState } from "react";
import userActions from "../../utils/actions/userActions";
import productionActions from "../../utils/actions/productionActions";
import UserProfile from "../../components/profile/UserProfile";
import ProductionHub from "../../components/productions/productionHub/ProductionHub";
import { useParams } from "react-router-dom";

export default function ViewParamRouter({}) {
    const [users, setUsers] = useState([]);
    const [productions, setProductions] = useState([]);

    const { param } = useParams();

    useEffect(() => {
        userActions.fetchUsers().then(setUsers);
        productionActions.fetchProductions().then(setProductions);
    }, []);

    const routeParam = () => {
        if (users.find((u) => (u.userName === param)))   {
            return (
                <UserProfile />
            )
        } else if (productions.find((p) => (p.title === param))) {
            return (
                <ProductionHub />
            )
        }
    }

    return (
        <>
            {routeParam()}
        </>
    )
}