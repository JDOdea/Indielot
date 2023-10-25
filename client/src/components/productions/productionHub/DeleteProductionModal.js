import { useContext, useState } from "react";
import { Button, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap"
import { ProductionContext } from "../../ApplicationViews";
import { deleteProduction } from "../../../managers/productionManager";
import { useNavigate } from "react-router-dom";

export default function DeleteProductionModal() {
    const [modal, setModal] = useState(false);
    const [deletion, setDeletion] = useState("");
    const [confirmed, setConfirmed] = useState(false);

    const navigate = useNavigate();

    const { production, setProduction } = useContext(ProductionContext);

    const toggle = () => setModal(!modal);

    const handleDelete = () => {
        deleteProduction(production.id).then(() => {
            setProduction(null);
            navigate(`/productions`);
        });
    }

    return (
        <div>
            <Button color="danger" onClick={toggle}>
                Delete
            </Button>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Delete `{production.title}'</ModalHeader>
                <ModalBody>
                    <div>Are You Sure You Want to Delete {`'${production.title}'`}?</div>
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
        </div>
    )
}