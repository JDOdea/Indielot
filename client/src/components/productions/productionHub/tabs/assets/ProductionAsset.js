import { ListGroupItem, ListGroupItemText } from "reactstrap";
import RemoveIcon from '@mui/icons-material/Remove';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { useContext, useState } from "react";
import { ProductionContext } from "../../../../ApplicationViews";
import { cloud_name, preset_key } from "../../../../../_env";
import axios from "axios";
import Asset from "./Asset";
import EditAssetModal from "./editAssets/EditAssetModal";
import DeleteAssetModal from "./editAssets/DeleteAssetModal";

export default function ProductionAsset({ asset, loggedInUser, getProductionAssets }) {
    const { production, setProduction } = useContext(ProductionContext);
    const [editAsset, setEditAsset] = useState(false);
    const [deleteAsset, setDeleteAsset] = useState(false);

    const handleAssetRemoval = (asset) => {
        axios
            .delete(`https://api.cloudinary.com/v1_1/${cloud_name}/delete_by_token/${asset.fileLocation}`)
            .then()
    }

    return (
        <>
            <Asset asset={asset}/>
            {
                production.productionLead === loggedInUser.fullName && (
                    <>
                        <ModeEditIcon
                            title="" 
                            style={{ marginLeft: "10px"}}
                            className="hov"
                            id="editAsset"
                            onClick={() => {
                                setEditAsset(true);
                            }}
                        />
                        <RemoveIcon 
                            title=""
                            style={{ width: "25px", height: "25px", marginLeft: "10px" }}
                            className="hov"
                            id="removeAsset"
                            onClick={() => {
                                setDeleteAsset(true);
                            }}
                        />
                    </>
                )
            }
            {editAsset && (
                <EditAssetModal asset={asset} editAsset={editAsset} setEditAsset={setEditAsset} loggedInUser={loggedInUser}/>
            )}
            {deleteAsset && (
                <DeleteAssetModal asset={asset} deleteModal={deleteAsset} setDeleteModal={setDeleteAsset}/>
            )}
        </>
    )
}

