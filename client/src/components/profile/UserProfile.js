import UserProfileBody from "./UserProfileBody";
import UserProfileHeader from "./UserProfileHeader";
import "./userProfile.css";

export default function UserProfile({ loggedInUser }) {


    return (
        <div className="profileContainer">
            <UserProfileHeader loggedInUser={loggedInUser}/>
            <UserProfileBody loggedInUser={loggedInUser}/>
        </div>
    )
}