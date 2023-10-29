import { useContext, useEffect, useState } from "react";
import { ProductionContext } from "../../../../../ApplicationViews";
import { Button, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { fetchCrewMemberById, fetchRoles, updateCrewMember } from "../../../../../../managers/crewManager";
import { fetchProductionById } from "../../../../../../managers/productionManager";

export default function EditCrewMemberModal({}) {
    const [modal, setModal] = useState(false);
    const [selectedCrewMember, setSelectedCrewMember] = useState(null);
    const [roles, setRoles] = useState([]);
    const [selectedCrewRoles, setSelectedCrewRoles] = useState([]);

    const { production, setProduction } = useContext(ProductionContext);
    
    const toggle = () => {
        setModal(!modal);
        if (!modal) setSelectedCrewMember(null);
    };
    

    const selectCrewMember = (crewMemberId) => {
        fetchCrewMemberById(crewMemberId).then((res) => {
            setSelectedCrewMember(res);
            setSelectedCrewRoles(res.roles);
        });

    }

    const handleRoleCheck = (role) => {
        if (selectedCrewRoles.find((r) => role === r)) {
            const updatedCrewRoles = selectedCrewRoles.filter((r) => r !== role);
            setSelectedCrewRoles(updatedCrewRoles);
        } else {
            const updatedCrewRoles = structuredClone(selectedCrewRoles);
            updatedCrewRoles.push(role);
            setSelectedCrewRoles(updatedCrewRoles);
        }
    }

    const handleUpdate = () => {
        const updatedCrewMember = {
            id: selectedCrewMember.id,
            roleNames: selectedCrewRoles
        }

        updateCrewMember(updatedCrewMember).then(() => {
            fetchProductionById(production.id).then(setProduction);
            toggle();
        });
    }

    useEffect(() => {
        fetchRoles().then(setRoles);
    }, []);

    return (
        <div>
            <Button color="dark" onClick={toggle}>
                Edit Crew
            </Button>
            {modal && (
                <Modal isOpen={modal} toggle={toggle}>
                    <ModalHeader toggle={toggle}>Edit Crew</ModalHeader>
                    <ModalBody>
                        <Input 
                            type="select"
                            name="crewSelect"
                            onChange={(e) => {
                                selectCrewMember(e.target.value);
                            }}
                        >
                            <option value={0} hidden>Select a Crew Member</option>
                            {production.crew.map((c) => (
                                <option 
                                    key={`crew-${c.name}`}
                                    value={c.id}
                                >{c.name}</option>
                            ))}
                        </Input>
                        {selectedCrewMember && (
                            <div>
                                <Label htmlFor="roles"><b>Roles</b></Label>
                                {roles.map((r) => (
                                    <div key={r}>
                                        <Input 
                                            type="checkbox"
                                            value={r}
                                            checked={!!selectedCrewRoles.find((cr) => {return cr === r})}
                                            onChange={() => {handleRoleCheck(r)}}
                                        />
                                        <Label>{r}</Label>
                                    </div>
                                ))}
                            </div>
                        )}
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={handleUpdate}>
                            Update Crew Member
                        </Button>
                    </ModalFooter>
                </Modal>
            )}
        </div>
    )
}