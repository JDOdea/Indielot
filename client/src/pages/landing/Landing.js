import AOS from "aos";
import { useEffect, useState } from "react";
import LandingHeader from "../../components/header/Header";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/logo.png"
import "./Landing.css"

export default function Landing({}) {
    const [isScrolledPast, setIsScrolledPast] = useState(false);
    const [hasScrolled, setHasScrolled] = useState(false);

    const navigate = useNavigate();

    const textCTA = "Join now";
    const linkCTA = "/login";

    const scrollListener = () => {
        setHasScrolled(true);
    };

    const handleTouchStart = (e) => {
        e.preventDefault();
        setHasScrolled(false);
        window.addEventListener("scroll", scrollListener);
    };

    const handleTouchEnd = (e) => {
        e.preventDefault();

        if (!hasScrolled) {
            setTimeout(() => navigate("/login"), 300);
        };
        
        window.removeEventListener("scroll", scrollListener);
    }

    useAOS();

    // useEffect for scrolling
    useEffect(() => {
        const onScroll = () => {
            setIsScrolledPast(window.scrollY >= 100);
        }

        window.addEventListener("scroll", onScroll);
        return () => {
            window.removeEventListener("scroll", onScroll);
        }
    }, []);

    return (
        <>
            <LandingHeader isScrolledPast={isScrolledPast}/>
            <main>
                <div className="p1">
                    <div className="p1Content">
                        <img
                            className="logoImg"
                            src={Logo}
                            alt="logo"
                        />
                        <h1
                            className="slogan"
                            data-aos="fade-down"
                            data-aos-easing="ease-in-out-back"
                            data-aos-duration="1200"
                            data-aos-delay="100"
                        > Cultivate, Collaborate, Create</h1>
                        <Link
                            to={linkCTA}
                            className="button nav-link"
                            onTouchStart={handleTouchStart}
                            onTouchEnd={handleTouchEnd}
                        >
                            <CTA textCTA={textCTA} />
                        </Link>
                    </div>
                </div>

                <div className="sectionContainer"></div>
                
                <div className="p2Wrapper">
                    <div className="p2">
                        <div
                            data-aos="zoom-out"
                            data-aos-easing="ease-in-out-back"
                            data-aos-duration="1000"
                            data-aos-offset="200"
                        >
                            <h1>Produce your independent ideas all in one place!</h1>
                            <h3 className="p2Blurb">
                                Easily access all production materials from your production hub.
                            </h3>
                        </div>
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-around",
                                padding: "0 50px"
                            }}
                        >
                            <h3 className="p2 Blurb">
                                Invite all your cast and crew to your production, and give them access to their required assets.
                            </h3>
                        </div>
                    </div>
                </div>
                <div className="p2">
                    <div
                        data-aos="zoom-out"
                        data-aos-easing="ease-in-out-back"
                        data-aos-duration="1000"
                        data-aos-offset="200"
                    >
                        <h1>Keep track of your tasks</h1>
                        <h3 className="p2Blurb">
                            Handle all steps of production in one place
                        </h3>
                    </div>
                </div>
                <div className="p1" style={{ height: "auto" }}>
                    <div className="p1Content p3Content">
                        <h1
                            className="slogan"
                            style={{ marginTop: "20px" }}
                            data-aos="fade-down"
                            data-aos-easing="ease-in-out-back"
                            data-aos-duration="1000"
                        >
                            Ready to start creating?
                        </h1>
                        <Link
                            to={linkCTA}
                            className="button nav-link"
                            onTouchStart={handleTouchStart}
                            onTouchEnd={handleTouchEnd}
                        >
                            <CTA textCTA={textCTA} />
                        </Link>
                    </div>
                </div>
            </main>
        </>
    )
}

// Initialize Animate On Scroll library
const useAOS = () => {
    useEffect(() => {
        AOS.init({
            once: "true",
            offset: 200
        })
    }, []);
}

// Handle call to action
const CTA = ({ textCTA }) => {
    return (
        <>
            <span
                data-aos="zoom-out"
                data-aos-easing="ease-out"
                data-aos-duration="200"
                data-aos-delay="1300"
            >
                <div className="bottom" />
            </span>

            <div
                className="top"
                data-aos="zoom-out"
                data-aos-easing="ease-out"
                data-aos-duration="300"
                data-aos-delay="1400"
            >
                <div className="label">{textCTA}</div>
            </div>
        </>
    )
}