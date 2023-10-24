import { Button, Form, FormFeedback, FormGroup, FormText, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { ProductionContext } from "../../../../../ApplicationViews";
import { createAsset, fetchTypes } from "../../../../../../managers/assetManager";
import { useContext, useEffect, useState } from "react";
import { cloud_name, preset_key } from "../../../../../../_env";
import axios from "axios";
import { fetchProductionById } from "../../../../../../managers/productionManager";


export default function AddAssetModal({ loggedInUser }) {
    const [modal, setModal] = useState(false);
    const [types, setTypes] = useState([]);

    const [selectedFile, setSelectedFile] = useState("");
    const [selectedType, setSelectedType] = useState(null);
    const [fileName, setFileName] = useState("");
    
    const [invalidFile, setInvalidFile] = useState(false);
    const [invalidType, setInvalidType] = useState(false);
    const [invalidName, setInvalidName] = useState(false);

    const toggle = () => {
        setModal(!modal)
        setSelectedFile("");
        setSelectedType(null);
        setFileName("");
    };

    const { production, setProduction } = useContext(ProductionContext);

    const handleAssetUpload = (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", preset_key);
        formData.append("folder", `indielot/files/${production.title.toLowerCase()}`);
        axios
            .post(`https://api.cloudinary.com/v1_1/${cloud_name}/upload`, formData)
            .then((res) => setSelectedFile(res.data.secure_url))
            .then(() => {
                
            })
            .catch((err) => console.log(err));
    }

    const handleAddAsset = (e) => {
        if (!selectedFile) {
            setInvalidFile(!invalidFile);
        }
        if (!selectedType) {
            setInvalidType(!invalidType);
        }
        if (!fileName) {
            setInvalidName(!invalidName);
        }
        if (!selectedFile || !selectedType || !fileName) {
            return;
        }
        
        const asset = {
            productionId: production.id,
            uploaderId: loggedInUser.id,
            assetName: fileName,
            fileLocation: selectedFile
        };

        createAsset(asset).then(() => {
            fetchProductionById(production.id).then((res) => {
                setProduction(res);
            })
            
            toggle();
        });
    }

    useEffect(() => {
        fetchTypes().then(setTypes);
    }, []);

    useEffect(() => {
        if (modal === false) {
            setSelectedFile(false);
            setInvalidType(false);
        }
    }, [modal]);

    return (
        <div>
            <Button color="dark" onClick={toggle}>
                Upload Asset
            </Button>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Upload '{production.title}' Asset</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Input 
                                type="file"
                                invalid={invalidFile}
                                accept=".png, .jpg, .jpeg, .webp, .pdf"
                                onChange={handleAssetUpload}
                            />
                            <FormText>
                                Accepts png, jpg, jpeg, webp, & pdf files.
                            </FormText>
                            <FormFeedback>
                                Select a file
                            </FormFeedback>
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="fileName">Name:</Label>
                            <Input
                                type="text"
                                invalid={invalidName}
                                onChange={(e) => {
                                    setFileName(e.target.value);
                                }}/>
                            <FormFeedback>
                                Must name your new Asset
                            </FormFeedback>
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="typeSelect">Type:</Label>
                            <Input
                                type="select"
                                invalid={invalidType}
                                onChange={(e) => {
                                    setSelectedType(e.target.value);
                                }}>
                                <option value={0} hidden>Select a Type</option>
                                {types.map((t) => (
                                    <option
                                        key={`type--${t}`}
                                        value={t}
                                    >{t.replace(/([A-Z])/g, ' $1').trim()}</option>
                                ))}
                            </Input>
                            <FormFeedback>
                                Must have a file type
                            </FormFeedback>
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button onClick={handleAddAsset}>
                        Upload
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    )
}