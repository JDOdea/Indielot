import { useContext, useEffect, useState } from "react";
import { fetchProductions } from "../../managers/productionManager";
import ProductionCard from "./ProductionCard";
import { ProductionContext } from "../views/ApplicationViews";

export default function ProductionList({ setProductionDetailsId }) {
    const [productions, setProductions] = useState([]);

    const { production, setProduction} = useContext(ProductionContext);

    const getAllProductions = () => {
        fetchProductions().then(setProductions);
    };

    useEffect(() => {
        getAllProductions();
        localStorage.removeItem("production");
        setProduction(null);
    }, []);


    return (
        <>
            <h2>Productions</h2>
            {productions.map((p) => (
                <ProductionCard 
                    productionObject={p}
                    setProductionDetailsId={setProductionDetailsId}
                    key={`production-${p.id}`}
                />
            ))}
        </>
    )
}