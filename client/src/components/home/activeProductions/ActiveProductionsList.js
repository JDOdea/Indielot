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
                <div key={`production-${p.id}`} className="activeProductionCardContainer">
                    <ActiveProductionCard productionObject={p}/>
                </div>
            ))}
        </>
    )
}