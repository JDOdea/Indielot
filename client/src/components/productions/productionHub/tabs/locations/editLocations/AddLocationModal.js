import { useContext, useState } from "react";
import { ReactComponent as PlusIcon } from "../../../../../../svgs/plusIcon.svg"
import { Button, Form, FormGroup, FormText, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { ProductionContext } from "../../../../../ApplicationViews";
import { createLocation } from "../../../../../../managers/locationManager";
import { fetchProductionById } from "../../../../../../managers/productionManager";

export default function AddLocationModal({ loggedInUser }) {
    const [modal, setModal] = useState(false);
    const [locationName, setLocationName] = useState("");
    const [locationDescription, setLocationDescription] = useState("");
    const [locationAddress, setLocationAddress] = useState("");

    const { production, setProduction } = useContext(ProductionContext);

    const toggle = () => {
        setModal(!modal);
    }

    const handleAddLocation = () => {
        const location = {
            productionId: production.id,
            name: locationName,
            description: locationDescription,
            address: locationAddress
        }

        createLocation(location).then(() => {
            fetchProductionById(production.id).then((res) => {
                setProduction(res);
            });
            reset();
            toggle();
        })
    }

    const reset = () => {
        setLocationName("");
        setLocationDescription("");
        setLocationAddress("");
    }

    return (
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <PlusIcon 
                style={{ width: "35px", height: "35px", cursor: "pointer" }}
                onClick={toggle}
            />
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Add '{production.title}' Location</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label htmlFor="name">Name:</Label>
                            <Input 
                                name="name"
                                type="text"
                                placeholder="Enter Location Name..."
                                onChange={(e) => {
                                    setLocationName(e.target.value);
                                }}/>
                                <FormText>Required</FormText>
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="description">Description:</Label>
                            <Input
                                name="description"
                                type="textarea"
                                placeholder="Enter Location Description..."
                                onChange={(e) => {
                                    setLocationDescription(e.target.value);
                                }}/>
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="address">Address:</Label>
                            <Input
                                name="address"
                                type="text"
                                placeholder="Enter Address..."
                                onChange={(e) => {
                                    setLocationAddress(e.target.value);
                                }}/>
                                <FormText>Required</FormText>
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    { locationName && locationAddress
                        ?
                        <Button 
                            block
                            onClick={handleAddLocation}
                        >
                            Add
                        </Button>
                        :
                        <Button
                            disabled
                            block
                        >
                            Add
                        </Button>
                    }
                </ModalFooter>
            </Modal>
        </div>
    )
}