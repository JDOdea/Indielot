import { useEffect, useState } from "react";
import Header from "./header/Header";
import Footer from "../components/footer/Footer";

const Layout = ({ children }) => {
    // Menu state
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [isDropdownOpen, setDropdownOpen] = useState(false);

    useEffect(() => {
        // Change body bg color on menu toggle
        if (isSidebarOpen) {
            document.body.classList.toggle("body-overlay");
        } else {
            document.body.classList.remove("body-overlay");
        }
    }, [isSidebarOpen]);

    return (
        <>
            <Header 
                isSidebarOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} 
                isDropdownOpen={isDropdownOpen} setDropdownOpen={setDropdownOpen}
            />
            {children}
            <Footer />
        </>
    );
};

export default Layout;