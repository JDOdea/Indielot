import { useContext, useEffect, useState } from "react";
import { ProductionContext } from "../../../../ApplicationViews";
import { fetchAssetsByProductionId } from "../../../../../managers/assetManager";
import { Button, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText } from "reactstrap";

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
        <ListGroup style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
            <ListGroup>
                <ListGroupItemHeading>Scripts</ListGroupItemHeading>
            </ListGroup>
            <ListGroup>
                <ListGroupItemHeading>Call Sheets</ListGroupItemHeading>
                {productionAssets.map((a) => (
                    <ListGroupItem 
                        style={{ display: "flex", justifyContent: "center"}}
                        key={`${a.assetName}`}
                    >
                        <ListGroupItemText>
                            {a.assetName}
                        </ListGroupItemText>
                    </ListGroupItem>
                ))}
            </ListGroup>
            <ListGroup>
                <ListGroupItemHeading>Locations</ListGroupItemHeading>
            </ListGroup>
            <ListGroup>
                <ListGroupItemHeading>Contracts</ListGroupItemHeading>
            </ListGroup>
        </ListGroup>
    )
}