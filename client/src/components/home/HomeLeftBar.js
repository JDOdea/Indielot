import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useEffect, useState } from 'react';
import { fetchProductions } from '../../managers/productionManager';
import { fetchActivity } from '../../managers/activityManager';

export default function HomeLeftBar({ loggedInUser }) {
    const [productions, setProductions] = useState([]);
    const [activity, setActivity] = useState([]);

    useEffect(() => {
        fetchProductions().then(setProductions);
        fetchActivity().then(setActivity);
    }, []);

    return (
        <div className="sideNav">
            <div className='sideNav-profile'>
                <div className='sideNav-profileBtn'>
                    <AccountCircleIcon className='sideNav-profilePic'/>
                    <span>{loggedInUser.userName}</span>
                    <ArrowDropDownIcon />
                </div>
            </div>
            <h6>Top Productions</h6>
            <div className='topProductionTitleBorder'></div>
            {productions.map((p) => (
                <a href={`#`} key={p.id} className='topProductionTitle'>
                    {p.title}
                </a>
            ))}
            <h6 className='recentActivityTitle'>Recent Activity</h6>
            <div className='topProductionTitleBorder'></div>
            {activity.map((a) => (
                <a href={`#`} key={a.id} className='recentActivity'>
                    <span>{a.updatedBy.fullName}</span><br />
                    <span style={{ fontSize: "13px" }}>{a.description}</span>
                </a>
            ))}
        </div>
    )
}