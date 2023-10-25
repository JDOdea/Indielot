import { useContext, useEffect, useState } from "react";
import { ProductionContext } from "../../../../ApplicationViews";
import { fetchAssetsByProductionId } from "../../../../../managers/assetManager";
import { ListGroup, ListGroupItemHeading } from "reactstrap";
import ProductionAsset from "./ProductionAsset";

export default function ProductionAssetList({ loggedInUser }) {
    const [productionAssets, setProductionAssets] = useState([]);

    const [productionScripts, setProductionScripts] = useState([]);
    const [productionCallSheets, setProductionCallSheets] = useState([]);
    const [productionLocations, setProductionLocations] = useState([]);
    const [productionContracts, setProductionContracts] = useState([]);
    const [productionMisc, setProductionMisc] = useState([]);

    const { production, setProduction } = useContext(ProductionContext);

    const getProductionAssets = () => {
        fetchAssetsByProductionId(production.id).then(setProductionAssets);
    }

    const sortAssets = () => {
        setProductionScripts(productionAssets.filter((a) => a.assetType === "Script"));
        setProductionCallSheets(productionAssets.filter((a) => a.assetType === "CallSheet"));
        setProductionLocations(productionAssets.filter((a) => a.assetType === "Location"));
        setProductionContracts(productionAssets.filter((a) => a.assetType === "Contract"));
        setProductionMisc(productionAssets.filter((a) => a.assetType === "Misc"));
    }

    useEffect(() => {
        getProductionAssets();
    }, []);

    useEffect(() => {
        getProductionAssets();
    }, [production]);

    useEffect(() => {
        if (productionAssets) {
            sortAssets();
        }
    }, [productionAssets]);

    if (!production || !productionAssets) return;
    return (
        <ListGroup style={{ display: "flex", flexDirection: "row", justifyContent: "space-around" }}>
            <ListGroup>
                <ListGroupItemHeading>Scripts</ListGroupItemHeading>
                {productionScripts.map((a) => (
                    <div key={`${a.assetName}`} style={{ display: "flex" }}><ProductionAsset asset={a} loggedInUser={loggedInUser}/></div>
                ))}
            </ListGroup>
            <ListGroup>
                <ListGroupItemHeading>Call Sheets</ListGroupItemHeading>
                {productionCallSheets.map((a) => (
                    <div key={`${a.assetName}`} style={{ display: "flex" }}><ProductionAsset asset={a} loggedInUser={loggedInUser}/></div>
                ))}
            </ListGroup>
            <ListGroup>
                <ListGroupItemHeading>Locations</ListGroupItemHeading>
                {productionLocations.map((a) => (
                    <div key={`${a.assetName}`} style={{ display: "flex" }}><ProductionAsset asset={a} loggedInUser={loggedInUser}/></div>
                ))}
            </ListGroup>
            <ListGroup>
                <ListGroupItemHeading>Contracts</ListGroupItemHeading>
                {productionContracts.map((a) => (
                    <div key={`${a.assetName}`} style={{ display: "flex" }}><ProductionAsset asset={a} loggedInUser={loggedInUser}/></div>
                ))}
            </ListGroup>
            <ListGroup>
                <ListGroupItemHeading>Misc.</ListGroupItemHeading>
                {productionMisc.map((a) => (
                    <div key={`${a.assetName}`} style={{ display: "flex" }}><ProductionAsset asset={a} loggedInUser={loggedInUser}/></div>
                ))}
            </ListGroup>
        </ListGroup>
    )
}