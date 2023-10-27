import { useEffect, useRef, useState } from "react";
import { CSSTransition } from "react-transition-group";

export default function DropdownMenu({ loggedInUser, setOpen }) {
    const [activeMenu, setActiveMenu] = useState('main');
    const [menuHeight, setMenuHeight] = useState(null);
    const dropdownRef = useRef(null);

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
                    {/* <DropdownItem>Profile</DropdownItem> */}
                    <DropdownLink link={`/${loggedInUser.userName}`}>Profile</DropdownLink>
                    <DropdownItem>Your Activity</DropdownItem>
                    <DropdownItem>Messages</DropdownItem>
                    <DropdownItem goToMenu="settings">Settings</DropdownItem>
                    <DropdownItem>Sign out</DropdownItem>
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