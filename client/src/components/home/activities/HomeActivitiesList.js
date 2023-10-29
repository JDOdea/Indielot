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
                <HomeActivityCard
                    activityObject={a}
                    key={`activity-${a.id}`}
                />
            ))}
        </>
    )
}