import { useState } from "react";
import { useAuthDetection } from "../../utils/auth-provider";
import { Link, useNavigate } from "react-router-dom";
import "../styles/landing.css";
import "../styles/button-3d-round.css";
import Logo from "../assets/logo.png"

export default function IndexPage({}) {
    const [hasScrolled, setHasScrolled] = useState(false);
    const isLoggedIn = useAuthDetection();

    const navigate = useNavigate();

    const scrollListener = () => {
        setHasScrolled(true);
    }

    const handleTouchStart = e => {
        e.preventDefault();
        setHasScrolled(false);
        window.addEventListener("scroll", scrollListener);
    }

    const handleTouchEnd = e => {
        e.preventDefault();
        if (!hasScrolled) {
            setTimeout(() => navigate("/login"), 300);
        }
        window.removeEventListener("scroll", scrollListener);
    }

    const sourceTransitionDuration = "400";

    const textCTA = isLoggedIn ? "Enter" : "Join now";
    const linkCTA = isLoggedIn ? `` : "/login";

    return (
        <>
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
                    >
                        Cultivate, Collaborate, Create
                    </h1>

                    {!isLoggedIn && (
                        <Link
                            to={linkCTA}
                            className="button nav-link"
                            onTouchStart={handleTouchStart}
                            onTouchEnd={handleTouchEnd}
                        >
                            <CTA textCTA={textCTA} />
                        </Link>
                    )}
                </div>
            </div>

            <div className="p2Wrapper">
                <div className="p2">
                    <div
                        data-aos="zoom-out"
                        data-aos-easing="ease-in-out-back"
                        data-aos-duration="1000"
                        data-aos-offset="200"
                    >
                        <h1>Already have playlists? No problem.</h1>
                        <h3 className="p2Blurb">
                            Connect your playlists from other major streaming platforms.
                        </h3>
                    </div>

                    <div className="sectionContainer">

                    </div>

                    <div className="p2">
                        <div
                            data-aos="zoom-out"
                            data-aos-easing="ease-in-out-back"
                            data-aos-duration="1000"
                            data-aos-offset="200"
                        >
                            <h1>Experience your music from any computer</h1>
                            <h3 className="p2Blurb">
                                Easily browse your saved online music from all platforms in one
                                place on your desktop, laptop, or work computer.
                            </h3>
                        </div>
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'space-around',
                                padding: '0 50px '
                            }}
                        >
                            <div
                                data-aos="fade-right"
                                data-aos-easing="ease-in-out-back"
                                data-aos-duration="1000"
                                data-aos-offset="300"
                            >
                                <h3 className="p2Blurb">
                                    Google Chrome and Mozilla Firefox supported.
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
                            <h1>Search across platforms in an instant</h1>
                            <h3 className="p2Blurb">
                                Couldn&apos;t find the song you&apos;re looking for? No need to
                                switch websites.
                            </h3>
                        </div>
                    </div>
                </div>

                <div className="p1" style={{ height: 'auto' }}>
                    <div className="p1Content p3Content">
                        <h1
                            className="slogan"
                            style={{ marginTop: '20px' }}
                            data-aos="fade-down"
                            data-aos-easing="ease-in-out-back"
                            data-aos-duration="1000"
                        >
                            Ready to start creating?
                        </h1>

                        {!isLoggedIn && (
                            <Link
                                to={linkCTA}
                                className="button nav-link"
                                onTouchStart={handleTouchStart}
                                onTouchEnd={handleTouchEnd}
                            >
                                <CTA textCTA={textCTA} />
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

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
    );
};

// TODO: FINISH