import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { CSSTransition } from "react-transition-group";
import "./DropdownMenu.css";

export default function DropdownMenu({ direction }) {
    const [activeMenu, setActiveMenu] = useState('main');
    const [menuHeight, setMenuHeight] = useState(null);
    const dropdownRef = useRef(null);

    const userContext = useContext(AuthContext);

    const calcHeight = (el) => {
        const height = el.offsetHeight;
        setMenuHeight(height);
    };

    useEffect(() => {
        setMenuHeight(dropdownRef.current?.firstChild.offsetHeight);
    }, []);

    // DropdownItems
    const DropdownItem = (props) => {
        return (
            <a href={props.link} className="menuItem" onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}>
                <span className="iconButton">{props.leftIcon}</span>
                {props.children}
                <span className="iconRight">{props.rightIcon}</span>
            </a>
        );
    };
    const DropdownLink = (props) => {
        return (
            <a href={props.link} className="menuItem" onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}>
                <span className="iconButton">{props.leftIcon}</span>
                {props.children}
                <span className="iconRight">{props.rightIcon}</span>
            </a>
        );
    };
    const DropdownLogout = (props) => {
        return (
            <a href={props.link} className="menuItem" onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}>
                <span className="iconButton">{props.leftIcon}</span>
                {props.children}
                <span className="iconRight">{props.rightIcon}</span>
            </a>
        );
    }

    return (
        <div className="dropdown" style={{ height: menuHeight }} ref={dropdownRef} >
            <CSSTransition
                in={activeMenu === "main"}
                timeout={500}
                classNames="menu menuPrimary"
                unmountOnExit
                onEnter={calcHeight}
            >
                <div className="dropdownMenu">
                    <DropdownLink >Profile</DropdownLink>
                    <DropdownItem>Activity</DropdownItem>
                    <DropdownLink >Messages</DropdownLink>
                    <DropdownItem >Settings</DropdownItem>
                    <DropdownLink >Switch Accounts</DropdownLink>
                    <DropdownLogout>Sign Out</DropdownLogout>
                </div>
            </CSSTransition>
        </div>
    )
}