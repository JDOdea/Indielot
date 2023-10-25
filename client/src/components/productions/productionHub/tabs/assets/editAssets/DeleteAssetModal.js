import { useContext, useState } from "react";
import { ProductionContext } from "../../../../../ApplicationViews";
import { Button, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { deleteAsset } from "../../../../../../managers/assetManager";
import { cloud_name, preset_key, api_key, api_secret } from "../../../../../../_env";
import axios from "axios";
import { fetchProductionById } from "../../../../../../managers/productionManager";
import { Cloudinary } from "@cloudinary/url-gen";

export default function DeleteAssetModal({ asset, deleteModal, setDeleteModal }) {
    const [deletion, setDeletion] = useState("");
    const [confirmed, setConfirmed] = useState(false);

    const toggle = () => {
        setDeleteModal(false);
    }
    
    const { production, setProduction } = useContext(ProductionContext);

    const handleDelete = () => {
        deleteAsset(asset).then(() => {
            fetchProductionById(production.id).then((res) => {
                setProduction(res);
            });
            setDeleteModal(false);
        })
    }

    return (
        <Modal isOpen={deleteModal} toggle={toggle}>
            <ModalHeader toggle={toggle}>Delete '{asset.assetName}'</ModalHeader>
            <ModalBody>
                <div>Are You Sure You Want to Delete '{asset.assetName}'?</div>
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