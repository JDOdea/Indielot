import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const ProductionContext = createContext(null);

export default function ProductionProvider({ children }) {
    const [production, setProduction] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        if (production) {
            localStorage.setItem("production", JSON.stringify(production));
            navigate(`/${production.title}`);
        }
    }, []);

    return (
        <ProductionContext.Provider value={{ production, setProduction }} >
            {children}
        </ProductionContext.Provider>
    )
}