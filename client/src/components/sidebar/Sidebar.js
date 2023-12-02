import { useNavigate } from "react-router-dom";
import { bool, string, array } from "prop-types";
import config from "../../config/config";
import "./Sidebar.css";
import { useEffect, useState } from "react";
import classNames from "classnames";

// Custom Sidebar components
import SidebarList from "./SidebarList";
import SidebarListItem, { 
    SidebarListItemWithOptions,
    SidebarBackListItem
} from "./SidebarListItem";
import IconArrow from "../iconArrow/IconArrow";

const closeSubMenuDelay = 300;

const Sidebar = ({ rootClassName, className, isMenuOpen, sidebarOptions }) => {
    const { rootClassName, className, isMenuOpen, sidebarOptions } = props;
    const sidebarClasses = classNames(rootClassName || css.root, className, {
        [css.sidebarOpen]: isMenuOpen
    });
    
    // Handle sub items state
    const [activeSubItem, setActiveSubItem] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const closeSubMenu = !isMenuOpen && activeSubItem;
        if (closeSubMenu) {
            setTimeout(() => {
                setactiveSubItem(null);
            }, [closeSubMenuDelay]);
        }
    }, [isMenuOpen, activeSubItem]);

    // Find the subItem options which will get filled
    //  once the user selects the item that has additional options (sub items)
    const subItemOptions = sidebarOptions.find((s) => s.key === activeSubItem) ?.options;

    // Render sidebar options from config.js file
    const options = subItemOptions ? subItemOptions : sidebarOptions;
    const renderSidebarOptions = options.map((option) => {
        return option.options ? (
            <SidebarListItemWithOptions
                key={option.key}
                item={option}
                activeSubItem={activeSubItem}
                setActiveSubItem={setActiveSubItem}
            />
        ) : (
            <SidebarListItem key={option.key} item={option} />
        );
    });

    return (
        <div className={sidebarClasses}>
            <SidebarList>
                {subItemOptions ? (
                    <SidebarBackListItem setActiveSubItem={setActiveSubItem} />
                ) : null}
                {renderSidebarOptions}
            </SidebarList>
            <div className={css.profile}>
                <div className={css.profileWrapper}>
                    {/* <Image
                        className={css.profileImage}
                        src={profileImageSrc}
                        alt="profile image"
                    /> */}
                    <span className={css.profileDisplayName}>Aleksa P.</span>
                </div>
                <IconArrow className={css.profileArrow} />
            </div>
        </div>
    );
};

Sidebar.defaultProps = {
    rootClassName: null,
    className: null,
    isMenuOpen: false,

    // Options
    sidebarOptions: config.sidebarOptions
};

Sidebar.propTypes = {
    rootClassName: string,
    className: string,
    isMenuOpen: bool.isRequired,

    // Options
    sidebarOptions: array.isRequired
};

export default Sidebar;