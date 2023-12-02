import { Link } from "react-router-dom";
import "./profileMenuItem.css"

export default function ProfileMenuItem({ title, Icon, link }) {

    return (
        <Link className="profileMenuItem" to={link && link}>
            <Icon />
            <span>{title}</span>
        </Link>
    )
}