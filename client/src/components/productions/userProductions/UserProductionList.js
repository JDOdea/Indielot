import { useEffect, useState } from "react";
import { fetchProductionsByUserId } from "../../../managers/productionManager";
import ProductionCard from "../ProductionCard";

export default function UserProductionList({ setProductionDetailsId, loggedInUser }) {
    const [productions, setProductions] = useState([]);

    const getUserProductions = () => {
        fetchProductionsByUserId(loggedInUser.id).then(setProductions);
    };

    useEffect(() => {
        getUserProductions();
    }, []);

    return (
        <>
            <h2>My Productions</h2>
            {productions.map((p) => (
                <ProductionCard
                    productionObject={p}
                    setProductionDetailsId={setProductionDetailsId}
                    key={`prodiction-${p.id}`}
                />
            ))}
        </>
    )
}