import { Button } from 'reactstrap';
import emptyProfile from '../../images/emptyProfile.png';

export default function UserProfileHeader({ loggedInUser }) {


    return (
        <div className="profileHeader">
            <div className="profileHeaderBackground"></div>

            <div className="profileHeaderContent">
                <div className="profileName">
                    <h1 >{loggedInUser.fullName}</h1>
                    <Button className='editProfile-btn'>Edit Profile</Button>
                </div>
                <div className="profileHeaderPictureFrame">
                    {
                        loggedInUser.profilePicturePath
                        ?
                        ""
                        :
                        <img className="profileHeaderEmptyPicture" src={emptyProfile} alt="No Uploaded Picture"/>
                    }
                    <div className='contact-btn'>
                        <button>Contact</button>
                    </div>
                </div>
            </div>
        </div>
    )
}