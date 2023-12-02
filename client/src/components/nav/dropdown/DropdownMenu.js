import InboxIcon from '@mui/icons-material/Inbox';
import { useContext, useEffect, useRef, useState } from "react";
import { CSSTransition } from "react-transition-group";
import { logout } from "../../../managers/authManager";
import { AuthContext } from '../../../context/AuthContext';

export default function DropdownMenu({ loggedInUser, setLoggedInUser, setOpen }) {
    const [activeMenu, setActiveMenu] = useState('main');
    const [menuHeight, setMenuHeight] = useState(null);
    const dropdownRef = useRef(null);

    const userContext = useContext(AuthContext);

    const DropdownItem = (props) => {
        return (
            <a href={props.link} className="menu-item" onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}>
                <span className="icon-button">{props.leftIcon}</span>
                {props.children}
                <span className="icon-right">{props.rightIcon}</span>
            </a>
        )
    }

    const DropdownLink = (props) => {
        return (
            <a href={props.link} className="menu-item" onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}>
                <span className="icon-button">{props.leftIcon}</span>
                {props.children}
                <span className="icon-right">{props.rightIcon}</span>
            </a>
        )
    }

    const DropdownLogout = (props) => {
        userContext.setUser("");
        userContext.setToken("");
        userContext.setAuthenticated(false);
        
        return (
            <a href={props.link} className="menu-item" 
                onClick={(e) => {
                    e.preventDefault();
                    setOpen(false);
                    logout().then(() => {
                        /* setLoggedInUser(null); */
                        setOpen(false);
                        userContext.setUser("");
                        userContext.setToken("");
                        userContext.setAuthenticated(false);
                    })
                }}>
                <span className="icon-button">{props.leftIcon}</span>
                {props.children}
                <span className="icon-right">{props.rightIcon}</span>
            </a>
        )
    }

    useEffect(() => {
        setMenuHeight(dropdownRef.current?.firstChild.offsetHeight);
    }, []);

    function calcHeight(el) {
        const height = el.offsetHeight;
        setMenuHeight(height);
    }

    return (
        <div className="dropdown" style={{ height: menuHeight }} ref={dropdownRef}>
            <CSSTransition
                in={activeMenu === "main"}
                timeout={500}
                classNames="menu-primary"
                unmountOnExit
                onEnter={calcHeight}>
                <div className="menu">
                    <DropdownLink link={`/${loggedInUser.userName}`}>Profile</DropdownLink>
                    <DropdownItem>Your Activity</DropdownItem>
                    <DropdownLink link="/inbox">Messages</DropdownLink>
                    <DropdownItem goToMenu="settings">Settings</DropdownItem>
                    <DropdownLogout>Sign Out</DropdownLogout>
                </div>
            </CSSTransition>

            <CSSTransition
                in={activeMenu === "settings"}
                timeout={500}
                classNames="menu-secondary"
                unmountOnExit
                onEnter={calcHeight}>
                <div className="menu">
                    <DropdownItem link="#" goToMenu="main">
                        <h2>Settings</h2>
                    </DropdownItem>
                </div>

            </CSSTransition>
        </div>
    )
}