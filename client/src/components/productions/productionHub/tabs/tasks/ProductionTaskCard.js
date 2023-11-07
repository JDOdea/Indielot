import { useContext } from "react";
import { ProductionContext } from "../../../../views/ApplicationViews";
import { Card, CardBody, CardFooter, CardHeader } from "reactstrap";
import ProductionTaskList from "./ProductionTaskList";
import AddTaskModal from "./editTasks/AddTaskModal";

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
                    <AddTaskModal/>
                </CardFooter>
            }
        </Card>
    )
}