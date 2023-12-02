import { useContext, useEffect, useState } from "react";
import Sidebar from "../../../components/sidebar/sidebar";
import Feed from "../components/feed";
import "../styles/home.css"
import { AuthContext } from "../../../context/AuthContext";
import activityActions from "../../../utils/actions/activityActions";
import productionActions from "../../../utils/actions/productionActions";

export default function Home({}) {
    const [productions, setProductions] = useState([]);
    const [activities, setActivities] = useState([]);
    const [loading, setLoading] = useState(true);

    const userContext = useContext(AuthContext);

    setTimeout(() => {
        setLoading(false);
    }, 2000);

    useEffect(() => {
        productionActions.fetchProductions().then(setProductions);
        activityActions.fetchActivity().then(setActivities);
    }, []);

    return (
        <div className="home__container">
            <Sidebar productions={productions} activities={activities} loggedInUser={userContext.user}/>
            {<Feed loading={loading} />}
        </div>
    )
}