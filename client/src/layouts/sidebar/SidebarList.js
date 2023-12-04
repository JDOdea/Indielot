import { node } from "prop-types";
import "./Sidebar.css"

const SidebarList = (props) => {
    const { children } = props;

    if (!children) {
        throw new Error("You need to pass children to SidebarList.");
    };

    return <ul className="sidebarList">{children}</ul>;
};

SidebarList.propTypes = {
    children: node.isRequired
};

export default SidebarList;