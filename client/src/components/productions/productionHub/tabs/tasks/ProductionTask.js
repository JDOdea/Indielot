import { useContext, useState } from "react";
import { ProductionContext } from "../../../../ApplicationViews";
import Task from "./Task";

export default function ProductionTask({ task, loggedInUser }) {
    const { production, setProduction } = useContext(ProductionContext);
    const [editTask, setEditTask] = useState(false);
    const [deleteTask, setDeleteTask] = useState(false);

    return (
        <>
            <Task task={task}/>
            {
                production.productionLead === loggedInUser.fullName || task.assignedTo === loggedInUser.fullName && (
                    <>
                        
                    </>
                )
            }
        </>
    )
}