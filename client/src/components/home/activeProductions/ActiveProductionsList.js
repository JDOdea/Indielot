import { useEffect, useState } from "react";
import ActiveProductionCard from "./ActiveProductionCard";
import { fetchActiveProductionsByUserId } from "../../../managers/productionManager";

export default function ActiveProductionsList({ loggedInUser }) {
    const [activeProductions, setActiveProductions] = useState([]);

    useEffect(() => {
        fetchActiveProductionsByUserId(loggedInUser.id).then(setActiveProductions);
    }, []);

    return (
        <>
            {activeProductions.map((p) => (
                <ActiveProductionCard
                    productionObject={p}
                    key={`production-${p.id}`}
                />
            ))}
        </>
    )
}