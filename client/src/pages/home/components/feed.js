import { useEffect, useState } from "react";
import activityActions from "../../../utils/actions/activityActions";
import "../styles/Feed.module.css";
import { CircularProgress } from "@mui/material";

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
                <CircularProgress />
            ) : (
                <article className="feedList"></article>
            )}
        </section>
    )
}