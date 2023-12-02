import { useContext } from "react";
import "./Navbar.css";
import { AuthContext } from "../../context/AuthContext";
import { NavbarBrand } from "reactstrap";
import { NavLink as RRNavLink, useNavigate} from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';
import AddIcon from '@mui/icons-material/Add';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ForumIcon from '@mui/icons-material/Forum';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import { logout } from "../../services/Managers/AuthManager"
import SearchBar from "../../components/searchbar/SearchBar";
import ProfileButton from "../../components/profileButton/ProfileButton";


export default function Navbar({}) {
    
    const navigate = useNavigate();
    const authContext = useContext(AuthContext);

    const logoutUser = (e) => {
        e.preventDefault();
        logout().then(() => {
            authContext.setUser("");
            authContext.setToken("");
            authContext.setAuthenticated(false);
            navigate("/");
        })
    }

    return (
        <header className="navbar">
            <section>
                <NavbarBrand className="navbarBrand" tag={RRNavLink} to="/">
                    <img
                        className="navLogo"
                        src="./logo600.png"
                        alt="logo"
                    />
                </NavbarBrand>
                <MenuIcon />
            </section>
            <section className="navSearchContainer">
                <SearchBar placeholder="Search..." />
            </section>
            <section className="navButtonsContainer">
                <div className="notificationButtonContainer">
                    <a href="#" className="notificationButton">
                        <span><NotificationsIcon className="notificationIcon"/></span>
                        <span className="badge">8</span>
                    </a>
                </div>
                <div className="messagingButtonContainer">
                    <a href="#" className="messagingButton">
                        <span><ForumIcon className="messagingIcon"/></span>
                        <span className="badge">2</span>
                    </a>
                </div>
                <div className="navProfileContainer">
                    <ProfileButton />
                </div>
            </section>
            {/* <section className="navIconContainer">
                <NotificationsIcon className="navIcon" />
                <DarkModeIcon className="navIcon" />
                <SettingsIcon className="navIcon" />
                <LogoutIcon className="navIcon" onClick={logoutUser} />
            </section> */}
        </header>
    )
}