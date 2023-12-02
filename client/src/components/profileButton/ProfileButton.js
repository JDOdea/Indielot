import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useContext, useState } from "react";
import { AuthContext } from '../../context/AuthContext';
import "./ProfileButton.css";

export default function ProfileButton({}) {
    const [open, setOpen] = useState(false);

    const userContext = useContext(AuthContext);

    return (
        <div className="profileButton" onClick={() => setOpen(!open)}>
            <AccountCircleIcon className="navIcon" />
            <span className="profileName">{userContext.user.firstName}</span>
            
            <ArrowDropDownIcon className="navIcon dropdownIcon" />
        </div>
        
    )
}