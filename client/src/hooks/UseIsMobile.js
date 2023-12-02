import { useEffect, useState } from "react";

const useIsMobile = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkIsMobile = () => {
            const mediaQuery = window.matchMedia("(max-width: 500px");
            setIsMobile(mediaQuery.matches);
        };

        //Initial check
        checkIsMobile();

        // Update on window resize
        window.addEventListener("resize", checkIsMobile);

        return () => {
            window.removeEventListener("resize", checkIsMobile);
        }
    }, []);

    return isMobile;
}

export default useIsMobile;