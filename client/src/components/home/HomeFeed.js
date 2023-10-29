import { useEffect, useState } from "react";
import { fetchActivity } from "../../managers/activityManager";
import HomeActivities from "./activities/HomeActivities";

export default function HomeFeed({ loggedInUser }) {
    const [activity, setActivity] = useState([]);

    useEffect(() => {
        fetchActivity().then(setActivity);
    }, []);

    return (
        <div className="homeFeed">
            <h4>Home</h4>
            <HomeActivities />
        </div>
    )
}