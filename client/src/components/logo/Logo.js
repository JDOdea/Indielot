import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import css from "./Logo.scss";

const Logo = (props) => {
    const { rootClassName, className } = props;
    const classes = classNames(rootClassName || css.root, className);

    return (
        <img
            className={classes}
            width="60"
            src="./logo600.png"
            alt="logo"
        />
    );
};

const { string } = PropTypes;

Logo.defaultProps = {
    rootClassName: null,
    className: null
};

Logo.propTypes = {
    rootClassName: string,
    className: string
};

export default Logo;