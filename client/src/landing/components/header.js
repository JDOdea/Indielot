import { useState } from "react";
import "../styles/header.css";
import { Link } from "react-router-dom";

export default function LandingHeader({ isScrolledPast }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleMenuState = state => {
        setIsMenuOpen(state.isOpen);
    }

    const closeMenu = () => {
        setIsMenuOpen(false);
    }

    return (
        <header
            className={`header ${
                isScrolledPast ? "headerScrolled" : null
            }`}
        >
            <div className="headerContainer">
                <Link
                    to="/"
                    className="homeLink"
                >
                    <h2>
                        <span>indielot</span>
                    </h2>
                </Link>
            </div>
            <div className="headerLinks">
                <Link
                    to="/login"
                    className="link"
                    activeclassname="active"
                >
                    Log In
                </Link>
                <Link
                    to="/register"
                    className="link"
                    activeclassname="active"
                >
                    Sign Up
                </Link>
            </div>

        </header>
    )
}