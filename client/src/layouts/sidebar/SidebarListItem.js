import { object, func, string } from "prop-types";
import IconArrow from "../../components/iconArrow/IconArrow";
import classNames from "classnames";
import "./Sidebar.css"

const SidebarListItem = (props) => {
    const { item } = props;
    
    return (
        
        <li className={`sidebarItem ${item.key === "home" ? "sidebarItemActive" : null}`}>
            {item.label}
        </li>
    );
};

SidebarListItem.defaultProps = {
    item: null
};

SidebarListItem.propTypes = {
    item: object.isRequired
};

export default SidebarListItem;

export const SidebarListItemWithOptions = (props) => {
    const { item, activeSubItem, setActiveSubItem } = props;

    // Determine if the item is currently active
    const isActive = activeSubItem === item.key;
    
    return (
        <li className="sidebarItemWithOptions">
            <div
                className="sidebarItem"
                onClick={() => setActiveSubItem(isActive ? null : item.key)}
            >
                <span>{item.label}</span>
                <IconArrow className="sidebarItemArrow" />
            </div>
        </li>
    );
};

SidebarListItemWithOptions.defaultProps = {
    item: null,
    activeSubItem: null,
    setActiveSubItem: null
};

SidebarListItemWithOptions.propTypes = {
    item: object.isRequired,
    activeSubItem: string,
    setActiveSubItem: func.isRequired
};

SidebarListItemWithOptions.displayName = "SidebarListItemWithOptions";

export const SidebarBackListItem = (props) => {
    const { setActiveSubItem } = props;
    const sidebarClasses = classNames("sidebarItem", "sidebarBackItem");

    return (
        <li className={sidebarClasses} onClick={() => setActiveSubItem(null)}>
            <IconArrow className="sidebarItemArrow" />
            <span>Return</span>
        </li>
    );
};

SidebarBackListItem.defaultProps = {
    setActiveSubItem: null
};

SidebarBackListItem.propTypes = {
    setActiveSubItem: func.isRequired
};

SidebarBackListItem.displayName = "SidebarBackListItem";