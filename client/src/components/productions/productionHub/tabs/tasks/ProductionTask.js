import { useContext, useState } from "react";
import { ProductionContext } from "../../../../views/ApplicationViews";
import Task from "./Task";

export default function ProductionTask({ task, loggedInUser }) {
    const { production, setProduction } = useContext(ProductionContext);
    const [editTask, setEditTask] = useState(false);

    return (
        <>
            <Task task={task} loggedInUser={loggedInUser}/>
            {
                production.productionLead === loggedInUser.fullName || task.assignedTo === loggedInUser.fullName && (
                    <>
                        
                    </>
                )
            }
        </>
    )
}