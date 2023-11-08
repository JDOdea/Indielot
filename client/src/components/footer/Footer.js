import { useWindowSize } from "../../utils/windowUtils"
import "./footer.css";
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

export default function Footer({}) {
    const [windowWidth, windowHeight] = useWindowSize();
    

    return (
        <footer
            className={`${windowWidth && windowHeight < 750 ? "hide-display" : "footer"}`}
        >
            <div className="footerContent">
                <span className="footerCopyright">&copy; 2023</span>
                <span role="img" aria-label="footer">
                    Made with ❤️ by {""}
                    <a
                        href="https://www.linkedin.com/in/jdfitzmartin/"
                        target="_blank"
                        without="true"
                        rel="noopener noreferrer"
                    >
                        {"JD Fitzmartin"}
                    </a>
                </span>
                <div className="footerIcons">
                    <span><GitHubIcon sx={{ fontSize: 30 }} /></span>
                    <span><LinkedInIcon sx={{ fontSize: 30 }} /></span>
                </div>
            </div>
        </footer>        
    )
}