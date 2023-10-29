import { useContext } from "react";
import { Card, CardBody, CardTitle } from "reactstrap";
import { ProductionContext } from "../../ApplicationViews";

export default function ActiveProductionCard({ productionObject }) {

    const { production, setProduction } = useContext(ProductionContext);

    return (
        <Card color="dark" outline style={{ marginBottom: "4px" }}>
            <CardBody
                className="activeProd-card"
                onClick={() => {
                    setProduction(productionObject);
                }}
            >
                <CardTitle tag="h5">{productionObject.title}</CardTitle>
            </CardBody>
        </Card>
    )
}