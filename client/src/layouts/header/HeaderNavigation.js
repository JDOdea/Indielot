import React from "react";
import PropTypes from "prop-types";
import Hamburger from "hamburger-react";
import "./Header.css";

const HeaderNavigation = (props) => {
    const { isMenuOpen, setMenuOpen } = props;

    if (!setMenuOpen) {
        throw new Error("Hamburger menu expects toggle function.");
    };

    const HamburgerOptions = {
        // Toggle state & function
        toggle: () => setMenuOpen(!isMenuOpen),
        toggled: isMenuOpen,

        // Icon options
        size: 24,
        duration: 0.25,
        direction: "right",
        label: "Show menu"
    };

    return (
        <div className="headerNavigation">
            <Hamburger {...HamburgerOptions} />
        </div>
    );
};

const { bool, func } = PropTypes;

HeaderNavigation.defaultProps = {
    isMenuOpen: false,
    setMenuOpen: null
};

HeaderNavigation.propTypes = {
    isMenuOpen: bool.isRequired,
    setMenuOpen: func.isRequired
};

export default HeaderNavigation;