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
            <div className="homeFeedBanner">
                <h4 className="homeTitle">Home</h4>
                <span className="feedFilter">Set Filter</span>
            </div>
            <HomeActivities />
        </div>
    )
}