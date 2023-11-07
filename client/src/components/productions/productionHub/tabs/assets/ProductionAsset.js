import RemoveIcon from '@mui/icons-material/Remove';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { useContext, useState } from "react";
import { ProductionContext } from "../../../../views/ApplicationViews";
import axios from "axios";
import Asset from "./Asset";
import EditAssetModal from "./editAssets/EditAssetModal";
import DeleteAssetModal from "./editAssets/DeleteAssetModal";

export default function ProductionAsset({ asset, loggedInUser }) {
    const { production, setProduction } = useContext(ProductionContext);
    const [editAsset, setEditAsset] = useState(false);
    const [deleteAsset, setDeleteAsset] = useState(false);

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

