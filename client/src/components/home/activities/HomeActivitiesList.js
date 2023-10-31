import { useEffect, useState } from "react";
import { fetchActivity } from "../../../managers/activityManager"
import HomeActivityCard from "./HomeActivityCard";

export default function HomeActivitiesList({}) {
    const [activities, setActivities] = useState([]);

    const getAllActivities = () => {
        fetchActivity().then(setActivities);
    }

    useEffect(() => {
        getAllActivities();
    }, []);

    return (
        <>
            {activities.map((a) => (
                <div
                    className="feedItem"
                    key={`activity-${a.id}`}>
                    <div className="card">
                        <HomeActivityCard activityObject={a}/>
                    </div>
                </div>
            ))}
        </>
    )
}/* className="activityFeedCard" */