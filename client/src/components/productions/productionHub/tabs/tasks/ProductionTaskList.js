import { useContext, useEffect, useState } from "react";
import { ProductionContext } from "../../../../ApplicationViews";
import { ListGroup, ListGroupItemHeading } from "reactstrap";
import { fetchTasksByProductionId } from "../../../../../managers/taskManager";
import ProductionTask from "./ProductionTask";

export default function ProductionTaskList({ loggedInUser }) {
    const [productionTasks, setProductionTasks] = useState([]);

    const [productionToDos, setProductionToDos] = useState([]);
    const [productionInProgress, setProductionInProgress] = useState([]);
    const [productionOnHold, setProductionOnHold] = useState([]);
    const [productionCompleted, setProductionCompleted] = useState([]);

    const { production, setProduction } = useContext(ProductionContext);

    const getProductionTasks = () => {
        fetchTasksByProductionId(production.id).then(setProductionTasks);
    }

    const sortTasks = () => {
        setProductionToDos(productionTasks.filter((t) => t.taskStatus === "ToDo"));
        setProductionInProgress(productionTasks.filter((t) => t.taskStatus === "InProgress"));
        setProductionOnHold(productionTasks.filter((t) => t.taskStatus === "OnHold"));
        setProductionCompleted(productionTasks.filter((t) => t.taskStatus === "Completed"));
    }
    
    useEffect(() => {
        getProductionTasks();
    }, []);

    useEffect(() => {
        getProductionTasks();
    }, [production]);

    useEffect(() => {
        if (productionTasks) {
            sortTasks();
        }
    }, [productionTasks]);

    if (!production || !productionTasks) return;
    return (
        <ListGroup style={{ display: "flex", flexDirection: "row", justifyContent: "space-around" }}>
            <ListGroup style={{ display: "flex", alignItems: "center" }}>
                <ListGroupItemHeading>To Do</ListGroupItemHeading>
                {productionToDos.map((t) => (
                    <div key={`${t.title}`}><ProductionTask task={t} loggedInUser={loggedInUser} /></div>
                ))}
            </ListGroup>
            <ListGroup style={{ display: "flex", alignItems: "center" }}>
                <ListGroupItemHeading>In Progress</ListGroupItemHeading>
                {productionInProgress.map((t) => (
                    <div key={`${t.title}`}><ProductionTask task={t} loggedInUser={loggedInUser} /></div>
                ))}
            </ListGroup>
            <ListGroup style={{ display: "flex", alignItems: "center" }}>
                <ListGroupItemHeading>On Hold</ListGroupItemHeading>
                {productionOnHold.map((t) => (
                    <div key={`${t.title}`}><ProductionTask task={t} loggedInUser={loggedInUser} /></div>
                ))}
            </ListGroup>
            <ListGroup style={{ display: "flex", alignItems: "center" }}>
                <ListGroupItemHeading>Completed</ListGroupItemHeading>
                {productionCompleted.map((t) => (
                    <div key={`${t.title}`}><ProductionTask task={t} loggedInUser={loggedInUser} /></div>
                ))}
            </ListGroup>
        </ListGroup>
    )
}