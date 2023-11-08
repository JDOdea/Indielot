import { useContext, useState } from "react";
import { ProductionContext } from "../../../../../views/ApplicationViews";
import { Button, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { deleteTask } from "../../../../../../managers/taskManager";
import { fetchProductionById } from "../../../../../../managers/productionManager";

export default function DeleteTaskModal({ task, deleteModal, setDeleteModal }) {
    const [deletion, setDeletion] = useState("");

    const toggle = () => {
        setDeleteModal(false);
    }

    const { production, setProduction } = useContext(ProductionContext);

    const handleDelete = () => {
        deleteTask(task).then(() => {
            fetchProductionById(production.id).then((res) => {
                setProduction(res);
            });
            setDeleteModal(false);
        })
    }

    return (
        <Modal isOpen={deleteModal} toggle={toggle}>
            <ModalHeader toggle={toggle}>Delete '{task.title}' from {production.title}</ModalHeader>
            <ModalBody>
                <div>Are You Sure You Want to Delete '{task.title}'?</div>
                <div>
                    <Label htmlFor="confirm">Type 'Delete' to confirm.</Label>
                    <Input 
                        name="confirm"
                        placeholder="Delete"
                        type="text"
                        onChange={(e) => {
                            setDeletion(e.target.value);
                        }}
                    />
                </div>
            </ModalBody>
            <ModalFooter>
                {
                    deletion === "Delete"
                    ?
                    <Button
                        color="danger"
                        block
                        onClick={handleDelete}
                    >
                        Confirm
                    </Button>
                    :
                    <Button
                        color="danger"
                        outline
                        disabled
                        block
                    >
                        Confirm
                    </Button>
                }
            </ModalFooter>
        </Modal>
    )
}