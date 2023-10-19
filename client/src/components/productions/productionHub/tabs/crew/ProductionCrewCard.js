import { Card, CardBody, CardHeader } from "reactstrap";
import ProductionCrewHeader from "./ProductionCrewHeader";
import ProductionCrewList from "./ProductionCrewList";

export default function ProductionCrewCard({}) {


    return (
        <Card color="dark" outline style={{ marginBottom: "4px" }}>
            <CardHeader>
                <ProductionCrewHeader />
            </CardHeader>
            <CardBody>
                <ProductionCrewList />
            </CardBody>
        </Card>
    )
}