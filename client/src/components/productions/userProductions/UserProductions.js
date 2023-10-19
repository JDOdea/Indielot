import { useState } from "react";
import UserProductionList from "./UserProductionList";
import UserProductionDetails from "./UserProductionDetails";

export default function UserProductions({ loggedInUser }) {
    const [detailsProductionId, setDetailsProductionId] = useState(null);

    return (
        <div className="container">
            <div className="row">
                <div className="col-sm-8">
                    <UserProductionList setProductionDetailsId={setDetailsProductionId} loggedInUser={loggedInUser}/>
                </div>
                <div>
                    <div className="col-sm-4">
                        <UserProductionDetails productionDetailsId={detailsProductionId}/>
                    </div>
                </div>
            </div>
        </div>
    )
}