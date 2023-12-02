import "./sidebarItem.css"

export default function SideBarItem({ Icon, text, active }) {
    return (
        <div className={`sidebarItem ${active && "sidebarItem--active"}`}>
            <Icon className="sidebarIcon" active={active && true}/>
            <span>{text}</span>
        </div>
    )
}