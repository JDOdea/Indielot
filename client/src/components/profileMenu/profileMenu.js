import ProfileMenuItem from "./profileMenuItem/profileMenuItem";
import PersonIcon from '@mui/icons-material/Person';
import MovieIcon from '@mui/icons-material/Movie';
import "./profileMenu.css"

export default function ProfileMenu({ active }) {
    return (
        <div className={active ? "profileMenu" : "invisible" }>
            <ProfileMenuItem title="Productions" Icon={MovieIcon}/>
            <ProfileMenuItem title="Profile" Icon={PersonIcon}/>
        </div>
    )
}