import { ListGroupItem, ListGroupItemText } from "reactstrap";

export default function Task({ task }) {

    return (
        <ListGroupItem className="task-card">
            <ListGroupItemText style={{display: "flex", flexDirection: "column", alignItems: "center" }}>
                <b><u>{task.title}</u></b>
                {task.description}
            </ListGroupItemText>
        </ListGroupItem>
    )
}