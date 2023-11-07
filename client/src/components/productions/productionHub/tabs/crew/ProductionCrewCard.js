import { Card, CardBody, CardFooter, CardHeader } from "reactstrap";
import ProductionCrewHeader from "./ProductionCrewHeader";
import ProductionCrewList from "./ProductionCrewList";
import { useContext } from "react";
import { ProductionContext } from "../../../../views/ApplicationViews";
import AddCrewMemberModal from "./editCrew/AddCrewMemberModal";
import EditCrewMemberModal from "./editCrew/EditCrewMemberModal";

export default function ProductionCrewCard({ loggedInUser }) {

    const { production, setProduction } = useContext(ProductionContext);

    return (
        <Card color="dark" outline style={{ marginBottom: "4px" }}>
            <CardHeader>
                <ProductionCrewHeader />
            </CardHeader>
            <CardBody>
                <ProductionCrewList loggedInUser={loggedInUser}/>
            </CardBody>
            {
                production.productionLead === loggedInUser.fullName &&
                <CardFooter style={{ display: "flex" }}>
                    <AddCrewMemberModal />
                    <EditCrewMemberModal />
                </CardFooter>
            }
        </Card>
    )
}