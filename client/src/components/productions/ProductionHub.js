import { useParams } from "react-router-dom"
import ProductionHubCard from "./ProductionHubCard";

export default function ProductionHub({ production }) {

    const { title } = useParams();

    return (
        <>
        <h1><u><b>{title}</b></u></h1>
        <ProductionHubCard productionObject={production}/>
        </>
    )
}