import { useContext, useState } from "react";
import { ProductionContext } from "../../../../../views/ApplicationViews";
import { Button, Form, FormGroup, FormText, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { updateLocation } from "../../../../../../managers/locationManager";
import { fetchProductionById } from "../../../../../../managers/productionManager";

export default function EditLocationModal({ location, editLocation, setEditLocation }) {
    const [locationName, setLocationName] = useState(location.name);
    const [locationDescription, setLocationDescription] = useState(location.description);
    const [locationAddress, setLocationAddress] = useState(location.address);

    const toggle = () => {
        setEditLocation(false);
    }

    const { production, setProduction } = useContext(ProductionContext);

    const handleEditLocation = () => {
        const updatedLocation = {
            id: location.id,
            name: locationName,
            description: locationDescription,
            address: locationAddress
        };

        updateLocation(updatedLocation).then(() => {
            fetchProductionById(production.id).then((res) => {
                setProduction(res);
            });
            toggle();

        })
    }

    return (
        <div>
            <Modal isOpen={editLocation} toggle={toggle}>
                <ModalHeader toggle={toggle}>Edit '{location.name}'</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label htmlFor="name">Name:</Label>
                            <Input
                                name="name"
                                type="text"
                                defaultValue={locationName}
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
                                defaultValue={locationDescription}
                                onChange={(e) => {
                                    setLocationDescription(e.target.value);
                                }}/>
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="address">Address:</Label>
                            <Input
                                name="address"
                                type="text"
                                defaultValue={locationAddress}
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
                            onClick={handleEditLocation}
                        >
                            Update
                        </Button>
                        :
                        <Button
                            disabled
                            block
                        >
                            Update
                        </Button>
                    }
                </ModalFooter>
            </Modal>
        </div>
    )
}