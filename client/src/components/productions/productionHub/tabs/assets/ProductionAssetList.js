import { useContext, useEffect, useState } from "react";
import { ProductionContext } from "../../../../ApplicationViews";
import { fetchAssetsByProductionId } from "../../../../../managers/assetManager";
import { ListGroup, ListGroupItem } from "reactstrap";

export default function ProductionAssetList({ loggedInUser }) {
    const [productionAssets, setProductionAssets] = useState([]);

    const { production, setProduction } = useContext(ProductionContext);

    const getProductionAssets = () => {
        fetchAssetsByProductionId(production.id).then(setProductionAssets);
    }

    useEffect(() => {
        getProductionAssets();
    }, []);

    if (!production || !productionAssets) return;
    return (
        <ListGroup>
            {productionAssets.map((a) => (
                <ListGroupItem 
                    style={{ display: "flex", justifyContent: "space-between"}}
                    key={`${a.assetName}`}
                >
                    <div>
                        {a.assetName}
                    </div>
                    <div>
                        {a.assetType.replace(/([A-Z])/g, ' $1').trim()}
                    </div>
                </ListGroupItem>
            ))}
        </ListGroup>
    )
}