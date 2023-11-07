import { useContext } from "react";
import { ProductionContext } from "../../../../views/ApplicationViews";
import { Card, CardBody, CardFooter, CardHeader } from "reactstrap";
import ProductionAssetList from "./ProductionAssetList";
import AddAssetModal from "./editAssets/AddAssetModal";

export default function ProductionAssetCard({ loggedInUser }) {
    const { production, setProduction } = useContext(ProductionContext);

    return (
        <Card color="dark" outline style={{ marginBottom: "4px" }}>
            <CardHeader></CardHeader>
            <CardBody>
                <ProductionAssetList loggedInUser={loggedInUser} />
            </CardBody>
            {
                production.productionLead === loggedInUser.fullName &&
                <CardFooter style={{ display: "flex" }}>
                    <AddAssetModal loggedInUser={loggedInUser}/>
                </CardFooter>
            }
        </Card>
    )
}