import { useContext } from "react";
import { 
    Button, 
    Card, 
    CardBody, 
    CardSubtitle, 
    CardText,
    CardTitle } from "reactstrap";
import { ProductionContext } from "../views/ApplicationViews";

export default function ProductionCard({ productionObject, setProductionDetailsId }) {

    const { production, setProduction } = useContext(ProductionContext);

    return (
        <Card color="dark" outline style={{ marginBottom: "4px" }}>
            <CardBody
                className="prod-card"
                onClick={() => {
                    setProduction(productionObject);
                }}
            >
                <CardTitle tag="h5">{productionObject.title}</CardTitle>
                <CardSubtitle className="mb-2 text-muted" tag="h6">
                    {productionObject.description}
                </CardSubtitle>
                <CardText>Lead by: {productionObject.productionLead}</CardText>
            </CardBody>
            {/* <Button
                color="dark"
                onClick={() => {
                    setProductionDetailsId(productionObject.id);
                    window.scrollTo({
                        top: 0,
                        left: 0,
                        behavior: "smooth"
                    })
                }}
            >
                Show Details
            </Button> */}
        </Card>
    )
}