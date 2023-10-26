import { useContext } from "react";
import { ProductionContext } from "../../../../ApplicationViews";
import { Card, CardBody, CardFooter, CardHeader } from "reactstrap";
import ProductionLocationList from "./ProductionLocationList";
import AddLocationModal from "./editLocations/AddLocationModal";

export default function ProductionLocationCard({ loggedInUser }) {
    const { production, setProduction } = useContext(ProductionContext);

    return (
        <Card color="dark" outline style={{ marginBottom: "4px" }}>
            <CardHeader></CardHeader>
            <CardBody>
                <ProductionLocationList loggedInUser={loggedInUser}/>
            </CardBody>
            {
                production.productionLead === loggedInUser.fullName && 
                <CardFooter>
                    <AddLocationModal/>
                </CardFooter>
            }
        </Card>
    )
}