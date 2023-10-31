import { useContext, useEffect } from "react";
import "./productionHub.css";
import { ProductionContext } from "../../ApplicationViews";
import ProductionHubNavBar from "./ProductionHubNavBar";

export default function ProductionHub({ loggedInUser }) {

    const { production, setProduction} = useContext(ProductionContext);

    useEffect(() => {
        if (!production) {
            const storedProduction = localStorage.getItem("production");
            setProduction(JSON.parse(storedProduction));
        };
    },[]);


    if (!production) return;
    return (
        <div className="productionHubContainer">
            <h1><u><b>{production.title}</b></u></h1>
            <ProductionHubNavBar loggedInUser={loggedInUser}/>
        </div>
    )
}