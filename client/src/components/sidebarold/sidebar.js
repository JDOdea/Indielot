import "./sidebar.css"
import { useState } from "react";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ProfileMenu from "../profileMenu/profileMenu";

export default function Sidebar({ productions, activities, loggedInUser }) {
    const [menuActive, setMenuActive] = useState(false);

    return (
        <div className="sidebar">
            <div className="sidebarProfile">
                <div className="sidebarProfileBtn" onClick={() => setMenuActive(!menuActive)}>
                    <AccountCircleIcon className="sidebarProfilePic" />
                    <span>{loggedInUser.userName}</span>
                    <ArrowDropDownIcon />
                </div>
            </div>
            <ProfileMenu active={menuActive} />
            {menuActive && <div className="closeProfileMenuPanel" />}
            <h6>Top Productions</h6>
            <div className="topProductionTitleBorder"></div>
            {productions.map((p) => (
                <a href="#" key={p.id} className="topProductionTitle">
                    {p.title}
                </a>
            ))}
            <h6 className="recentActivityTitle">Recent Activity</h6>
            <div className="topProductionTitleBorder"></div>
            {activities.map((a) => (
                <a href="#" key={a.id} className="recentActivity">
                    <span>{a.updatedBy.fullName} <span style={{ fontSize: "13px" }}>{a.description}</span></span>
                </a>
            ))}
        </div>
    )
}