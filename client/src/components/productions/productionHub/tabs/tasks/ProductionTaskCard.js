import { useContext } from "react";
import { ProductionContext } from "../../../../ApplicationViews";
import { Card, CardBody, CardFooter, CardHeader } from "reactstrap";
import ProductionTaskList from "./ProductionTaskList";

export default function ProductionTaskCard({ loggedInUser }) {
    const { production, setProduction } = useContext(ProductionContext);

    return (
        <Card color="dark" outline style={{ marginBottom: "4px" }}>
            <CardHeader></CardHeader>
            <CardBody>
                <ProductionTaskList loggedInUser={loggedInUser}/>
            </CardBody>
            {
                production.productionLead === loggedInUser.fullName &&
                <CardFooter>
                    
                </CardFooter>
            }
        </Card>
    )
}