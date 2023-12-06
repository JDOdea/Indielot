import { useEffect, useState } from "react";
import { bool, string, array } from "prop-types";
import { useNavigate } from "react-router-dom";
import config from "../../config/config";
import "./Sidebar.css";
import Image from "../../components/image/Image.js";
import profileImageSrc from "../../assets/sidebar/jakeAvatar.png";

// Custom Sidebar components
import SidebarList from "./SidebarList";
import SidebarListItem, { 
    SidebarListItemWithOptions,
    SidebarBackListItem
} from "./SidebarListItem";
import IconArrow from "../../components/iconArrow/IconArrow";

const closeSubMenuDelay = 300;

const Sidebar = (props) => {
    const { rootClassName, className, isMenuOpen, sidebarOptions } = props;
    
    // Handle sub items state
    const [activeSubItem, setActiveSubItem] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const closeSubMenu = !isMenuOpen && activeSubItem;
        if (closeSubMenu) {
            setTimeout(() => {
                setActiveSubItem(null);
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
        <div className={`sidebarRoot ${isMenuOpen ? "sidebarOpen" : null}`}>
            <SidebarList>
                {subItemOptions ? (
                    <SidebarBackListItem setActiveSubItem={setActiveSubItem} />
                ) : null}
                {renderSidebarOptions}
            </SidebarList>

            <div className="sidebarProfile">
                <div className="sidebarProfileWrapper">
                    <Image
                        className="sidebarProfileImage"
                        src={profileImageSrc}
                        alt="profile image"
                    />
                    <span className="sidebarProfileDisplayName">Jake</span>
                </div>
                <IconArrow className="sidebarProfileArrow" />
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