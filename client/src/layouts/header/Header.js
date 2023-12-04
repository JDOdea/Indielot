import React, { useContext, useRef } from "react";
import "./Header.css";
import PropTypes from "prop-types";
import classNames from "classnames";
import HeaderNavigation from "./HeaderNavigation.js";
import { useOutsideAlerter } from "../../utils/helpers";
import Sidebar from "../sidebar/Sidebar.js"
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
import Logo from "../../components/logo/Logo";
import Image from "../../components/image/Image";
import profileImageSrc from "../../assets/sidebar/jakeAvatar.png";

const Header = (props) => {
    const { rootClassName, className, isSidebarOpen, setSidebarOpen, isDropdownOpen, setDropdownOpen } = props;

    const headerRef = useRef(null);
    useOutsideAlerter(headerRef, () => {
        setSidebarOpen(false);
    });
    const dropdownRef = useRef(null);
    useOutsideAlerter(dropdownRef, () => {
        setDropdownOpen(false);
    })

    return (
        <div className="headerRoot" ref={headerRef}>
            <div className="headerContent">
                <div className="headerLeft">
                    <Logo className="logo" />
                    <HeaderNavigation isMenuOpen={isSidebarOpen} setMenuOpen={setSidebarOpen} />
                </div>
                <div className="headerCenter">
                    <div className="navSearchContainer">
                        <SearchBar className="headerSearch" placeholder="Search..."/>
                    </div>
                </div>
                <div className="headerRight">
                    <div className="navButtonsContainer">
                        <div className="notificationButtonContainer">
                            <a href="#" className="notificationButton navIconButton">
                                <span><NotificationsIcon className="notificationIcon"/></span>
                                {/* <span className="badge">8</span> */}
                            </a>
                        </div>
                            <div className="messagingButtonContainer">
                                <a href="#" className="messagingButton navIconButton">
                                    <span><ForumIcon className="messagingIcon"/></span>
                                    {/* <span className="badge">2</span> */}
                                </a>
                            </div>
                    </div>
                    <div className="headerProfile">
                        <div className="headerProfileWrapper">
                            <ProfileButton 
                                className="headerProfileImage" 
                                src={profileImageSrc} 
                                alt="profile image" 
                                hasDropdown={true}
                                direction="down"
                                dropdownRef={dropdownRef}
                                isMenuOpen={isDropdownOpen}
                                setMenuOpen={setDropdownOpen}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <Sidebar isMenuOpen={isSidebarOpen} />
        </div>
    )
    
    
    /* const navigate = useNavigate();
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
                                        <section className="navIconContainer">
                                            <NotificationsIcon className="navIcon" />
                                            <DarkModeIcon className="navIcon" />
                                            <SettingsIcon className="navIcon" />
                                            <LogoutIcon className="navIcon" onClick={logoutUser} />
                                        </section>
        </header>
    ) */
}

const { string, bool, func } = PropTypes;

Header.defaultProps = {
    rootClassName: null,
    className: null,
    isSidebarOpen: false,
    setSidebarOpen: null,
    isDropdownOpen: false,
    setDropdownOpen: null
};

Header.propTypes = {
    rootClassName: string,
    className: string,
    isSidebarOpen: bool.isRequired,
    setSidebarOpen: func.isRequired,
    isDropdownOpen: bool.isRequired,
    setDropdownOpen: func.isRequired
};

export default Header;