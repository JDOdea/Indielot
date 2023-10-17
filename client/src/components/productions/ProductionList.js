import { useEffect, useState } from "react";
import { fetchProductions } from "../../managers/productionManager";
import ProductionCard from "./ProductionCard";

export default function ProductionList({ setProductionDetailsId }) {
    const [productions, setProductions] = useState([]);

    const getAllProductions = () => {
        fetchProductions().then(setProductions);
    };

    useEffect(() => {
        getAllProductions();
    }, []);


    return (
        <>
            <h2>Productions</h2>
            {productions.map((p) => (
                <ProductionCard 
                    production={p}
                    key={`production--${p.id}`}
                />
            ))}
        </>
    )
}