import { Card, CardBody, CardFooter, CardHeader } from "reactstrap";
import ProductionCrewHeader from "./ProductionCrewHeader";
import ProductionCrewList from "./ProductionCrewList";
import { useContext } from "react";
import { ProductionContext } from "../../../../ApplicationViews";
import AddCrewMemberModal from "./editCrew/AddCrewMemberModal";
import { fetchCrewMemberById } from "../../../../../managers/crewManager";
import EditCrewMemberModal from "./editCrew/EditCrewMemberModal";

export default function ProductionCrewCard({ loggedInUser }) {

    const { production, setProduction } = useContext(ProductionContext);

    const getCrew = () => {
        fetchCrewMemberById(production.id);
    }

    return (
        <Card color="dark" outline style={{ marginBottom: "4px" }}>
            <CardHeader>
                <ProductionCrewHeader />
            </CardHeader>
            <CardBody>
                <ProductionCrewList loggedInUser={loggedInUser} getCrew={getCrew}/>
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