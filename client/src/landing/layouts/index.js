import "aos/dist/aos.css";
import "../styles/global.css"
import AOS from "aos";
import { useEffect, useState } from "react";
import LandingHeader from "../components/header";
import IndexPage from "../pages";
import ParticlesContainer from "../components/particlesContainer";

export default function Landing({ children }) {
    const [isScrolledPast, setIsScrolledPast] = useState(false);

    useAOS();

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
            <ParticlesContainer />
            <LandingHeader isScrolledPast={isScrolledPast} />
            <IndexPage />
        </>
    )

}

const useAOS = () => {
    useEffect(() => {
        AOS.init({
            once: "true",
            offset: 200
        });
    }, []);
}