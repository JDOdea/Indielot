import ClearIcon from '@mui/icons-material/Clear';
import { ListGroupItem, ListGroupItemText } from "reactstrap";
import { ProductionContext } from '../../../../ApplicationViews';
import { useContext, useState } from 'react';
import DeleteTaskModal from './editTasks/DeleteTaskModal';

export default function Task({ task, loggedInUser }) {
    const [deleteTask, setDeleteTask] = useState(false);
    const { production, setProduction } = useContext(ProductionContext);

    return (
        <ListGroupItem className="task-card">
            <ListGroupItemText style={{display: "flex", flexDirection: "column", alignItems: "center" }}>
                <b><u>{task.title}</u></b>
                {task.description}
                {
                    production.productionLead === loggedInUser.fullName && (
                        <>
                            <ClearIcon 
                                title=""
                                className='hov'
                                id="deleteTask"
                                onClick={() => {
                                    setDeleteTask(true);
                                }}
                            />
                            {deleteTask && (
                                <DeleteTaskModal task={task} deleteModal={deleteTask} setDeleteModal={setDeleteTask}/>
                            )}
                        </>
                    )
                }
            </ListGroupItemText>
        </ListGroupItem>
    )
}