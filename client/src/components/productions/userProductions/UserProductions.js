import { useState } from "react";
import "./userProductions.css"
import UserProductionList from "./UserProductionList";
import UserProductionDetails from "./UserProductionDetails";
import emptyProfile from '../../../images/emptyProfile.png';

export default function UserProductions({ loggedInUser }) {
    const [detailsProductionId, setDetailsProductionId] = useState(null);

    return (
        <div className="userProductionsContainer">
            <div className="user-profile">
                <img className="user-profile-pic" src={emptyProfile} alt="No Uploaded Picture"/>
                <div className="profileName" style={{ color: "black", top: "37%", left: "17.7%"}}>
                    <h2>{loggedInUser.fullName}</h2>
                </div>
                <div className="profileUserName">
                    <h6>{loggedInUser.userName}</h6>
                </div>
                <div className="editProfileBtn">
                    <button style={{ borderRadius: "5px", width: "100%" }}>Edit Profile</button>
                </div>
            </div>
            <div className="productionsContainer">
                <div className="productionRow">
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
        </div>
    )
}