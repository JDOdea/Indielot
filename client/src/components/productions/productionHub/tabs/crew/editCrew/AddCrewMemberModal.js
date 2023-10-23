import { useContext, useEffect, useState } from "react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { ProductionContext } from "../../../../../ApplicationViews";
import AddModalSearchBar from "./AddModalSearchBar";
import AddedCrewMember from "./AddedCrewMember";
import { createCrewMember } from "../../../../../../managers/crewManager";
import { fetchProductionById } from "../../../../../../managers/productionManager";

export default function AddCrewMemberModal({ getCrew }) {
    const [modal, setModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [role, setRole] = useState(null);

    const toggle = () => setModal(!modal);

    const { production, setProduction } = useContext(ProductionContext);

    const handleAddCrewMember = () => {
        const newCrewMember = {
            userProfileId: selectedUser.id,
            productionId: production.id,
            roleNames: [role]
        }

        createCrewMember(newCrewMember).then(() => {
            fetchProductionById(production.id).then((res) => {
                setProduction(res);
                toggle();
            });
        });
    }

    useEffect(() => {
        if (modal === false) {
            setSelectedUser(null);
            setRole(null);
        };
    }, [modal]);

    return (
        <div>
            <Button color="dark" onClick={toggle}>
                Add Member
            </Button>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Add Member to '{production.title}'</ModalHeader>
                <ModalBody>
                    <AddModalSearchBar selectedUser={selectedUser} setSelectedUser={setSelectedUser}/>
                    <AddedCrewMember selectedUser={selectedUser} setSelectedUser={setSelectedUser} selectedRole={role} setSelectedRole={setRole}/>
                </ModalBody>
                    {selectedUser != null && role != null && (
                        <ModalFooter>
                            <Button onClick={handleAddCrewMember}>
                                Add Crew
                            </Button>
                        </ModalFooter>
                    )}
            </Modal>
        </div>
    )
}