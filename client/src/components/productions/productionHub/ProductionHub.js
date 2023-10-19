import { useParams } from "react-router-dom"
import ProductionHubCard from "./ProductionHubCard";
import { useContext, useEffect, useState } from "react";
import { ProductionContext } from "../../ApplicationViews";

export default function ProductionHub({ loggedInUser }) {
    const { title } = useParams();

    const { production, setProduction} = useContext(ProductionContext);

    useEffect(() => {
        if (!production) {
            const storedProduction = localStorage.getItem("production");
            setProduction(JSON.parse(storedProduction));
        };
    },[]);


    if (!production) return;
    return (
        <>
            <h1><u><b>{production.title}</b></u></h1>
            <ProductionHubCard loggedInUser={loggedInUser}/>
        </>
    )
}