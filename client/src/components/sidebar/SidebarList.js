import { string, node } from "prop-types";
import classNames from "classnames";

const SidebarList = (props) => {
    const { rootClassName, className, children } = props;
    const classes = classNames(rootClassName || css.SidebarList, className);

    if (!children) {
        throw new Error("You need to pass children to SidebarList.");
    };

    return <ul className={classes}>{children}</ul>;
};

SidebarList.defaultProps = {
    rootClassName: null,
    className: null
};

SidebarList.propTypes = {
    rootClassName: string,
    className: string,
    children: node.isRequired
};

export default SidebarList;