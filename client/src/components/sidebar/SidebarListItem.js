import { object, func, string } from "prop-types";
import classNames from "classnames";
import IconArrow from "../iconArrow/IconArrow";

const SidebarListItem = (props) => {
    const { item } = props;
    
    return (
        <li
            className={classNames(css.SidebarListItem, {
                [css.sidebarItemActive]: item.key === "home"
            })}
        >
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
        <li className={css.sidebarItemWithOptions}>
            <div
                className={css.sidebarItem}
                onClick={() => setActiveSubItem(isActive ? nulll : item.key)}
            >
                <span>{item.label}</span>
                <IconArrow className={css.sidebarItemArrow} />
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
    const sidebarClasses = classNames(css.sidebarItem, css.sidebarBackItem);

    return (
        <li className={sidebarClasses} onClick={() => setActiveSubItem(null)}>
            <IconArrow className={css.sidebarItemArrow} />
            <span>return</span>
        </li>
    );
};

SidebarBackListItem.defaultProps = {
    setActiveSubItem: null
};

sidebarBackItem.propTypes = {
    setActiveSubItem: func.isRequired
};

SidebarBackListItem.displayName = "SidebarBackListItem";