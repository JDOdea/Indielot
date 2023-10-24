import { useContext } from "react";
import { ProductionContext } from "../../../../ApplicationViews";
import { Card, CardBody, CardHeader } from "reactstrap";
import ProductionAssetList from "./ProductionAssetList";

export default function ProductionAssetCard({ loggedInUser }) {
    const { production, setProduction } = useContext(ProductionContext);

    const getAssets = () => {

    }

    return (
        <Card color="dark" outline style={{ marginBottom: "4px" }}>
            <CardHeader></CardHeader>
            <CardBody>
                <ProductionAssetList loggedInUser={loggedInUser} />
            </CardBody>
        </Card>
    )
}