import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

export default function HomeLeftBar({ loggedInUser }) {

    return (
        <div className="sideNav">
            <div className='sideNav-profile'>
                <div className='sideNav-profileBtn'>
                    <AccountCircleIcon className='sideNav-profilePic'/>
                    <span>{loggedInUser.userName}</span>
                    <ArrowDropDownIcon />
                </div>
            </div>
            <h6>Top Productions</h6>
            <a href="#about">About</a>
            <a href="#services">Services</a>
            <a href="#clients">Clients</a>
            <a href="#contact">Contact</a><br/>
            <h6>Recent Activity</h6>
        </div>
    )
}