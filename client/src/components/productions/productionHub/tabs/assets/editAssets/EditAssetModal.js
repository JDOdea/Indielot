import { useContext, useEffect, useState } from "react";
import { ProductionContext } from "../../../../../views/ApplicationViews";
import { fetchTypes, updateAsset } from "../../../../../../managers/assetManager";
import { Button, Form, FormGroup, FormText, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { fetchProductionById } from "../../../../../../managers/productionManager";

export default function EditAssetModal({ asset, editAsset, setEditAsset, loggedInUser }) {
    const [types, setTypes] = useState([]);

    const [selectedFile, setSelectedFile] = useState(asset.fileLocation);
    const [selectedType, setSelectedType] = useState(asset.assetType);
    const [assetName, setAssetName] = useState(asset.assetName);

    const toggle = () => {
        setEditAsset(false);
    }

    const { production, setProduction } = useContext(ProductionContext);

    const handleEditAsset = () => {
        const newAsset = {
            id: asset.id,
            uploaderId: loggedInUser.id,
            assetName,
            assetTypeName: selectedType
        }

        updateAsset(newAsset).then(() => {
            fetchProductionById(production.id).then((res) => {
                setProduction(res);
            })

            setEditAsset(false);
        })
    }

    useEffect(() => {
        fetchTypes().then(setTypes);
    }, []);


    return (
        <div>
            <Modal isOpen={editAsset} toggle={toggle} fullscreen>
                <ModalHeader toggle={toggle}>Edit '{asset.assetName}'</ModalHeader>
                <ModalBody>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <Form>
                            <FormGroup>
                                <Input
                                    type="file"
                                    accept=".png, .jpg, .jpeg, .webp, .pdf"
                                />
                                <FormText>
                                    Accepts png, jpg, jpeg, webp, & pdf files.
                                </FormText>
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="fileName">Name:</Label>
                                <Input
                                    type="text"
                                    defaultValue={`${asset.assetName}`}
                                    onChange={(e) => {
                                        setAssetName(e.target.value);
                                    }}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="typeSelect">Type:</Label>
                                <Input 
                                    type="select"
                                    onChange={(e) => {
                                        setSelectedType(e.target.value);
                                    }}
                                >
                                    {types.map((t) => (
                                        <option
                                            key={`type--${t}`}
                                            value={t}
                                            selected={t === selectedType}
                                        >{t.replace(/([A-Z])/g, ' $1').trim()}</option>
                                    ))}
                                </Input>
                            </FormGroup>
                        </Form>
                        <iframe 
                            title={asset.assetName}
                            src={selectedFile}
                            width="80%"
                            height="800"
                        />
                    </div>
                </ModalBody>
                <ModalFooter style={{ justifyContent: "flex-start" }}>
                    <Button onClick={handleEditAsset}>
                        Update
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    )
}