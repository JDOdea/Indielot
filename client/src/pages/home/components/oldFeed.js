import { useEffect, useState } from "react";
import activityActions from "../../../utils/actions/activityActions";
import Loading from "../../../components/loading/loading";
import Activity from "./activity";

export default function Feed({ loading }) {
    const [activities, setActivities] = useState([]);

    useEffect(() => {
        activityActions.fetchActivity().then(setActivities);
    }, []);

    return (
        <section className="feed">
            <div className="feedBanner">
                <h4 className="title">Home</h4>
                <span className="filter">Set Filter</span>
            </div>
            {loading ? (
                <Loading />
            ) : (
                <article className="feedList">
                    {activities.map((a) => (
                        <Activity 
                            key={a.id}
                            username={a.updatedBy.userName}
                            displayName={a.updatedBy.fullName}
                            text={a.description}
                            date={a.activityDate}
                            production={a.production.title}
                        />
                    ))}
                </article>
            )}
        </section>
    )
}