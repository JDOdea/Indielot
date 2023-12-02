import { useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css"
import Logo from "../../assets/logo600.png"
import useIsMobile from "../../hooks/UseIsMobile";

export default function LandingHeader({ isScrolledPast }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const isMobile = useIsMobile();

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
            } ${
                isMobile ? "mobileHeader" : null
            }`}
        >
            <div className="headerContainer">
                <Link
                    to="/"
                    className="homeLink"
                >
                    <img 
                        className="logo"
                        src={Logo}
                        alt="logo"
                    />
                </Link>
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
            </div>
            

        </header>
    )
}