import { useContext } from "react";
import { ProductionContext } from "../../../../ApplicationViews";
import { Card, CardBody, CardHeader } from "reactstrap";
import ProductionLocationList from "./ProductionLocationList";

export default function ProductionLocationCard({ loggedInUser }) {
    const { production, setProduction } = useContext(ProductionContext);

    return (
        <Card color="dark" outline style={{ marginBottom: "4px" }}>
            <CardHeader></CardHeader>
            <CardBody>
                <ProductionLocationList loggedInUser={loggedInUser}/>
            </CardBody>
        </Card>
    )
}