import { useContext, useEffect, useState } from "react";
import Calendar from "./Calendar";
import CreateEventModal from "./editSchedule/newEvent/CreateEventModal";
import { ProductionContext } from "../../../../views/ApplicationViews";
import { fetchEventsByProductionId } from "../../../../../managers/calendarEventManager";

export default function ProductionSchedule({ loggedInUser }) {
    const [events, setEvents] = useState([]);

    const { production, setProduction } = useContext(ProductionContext);

    const getEvents = () => {
        fetchEventsByProductionId(production.id).then(setEvents);
    }

    useEffect(() => {
        getEvents();
    }, []);

    if (!events) return;
    return (
        <div>
            {production.productionLead === loggedInUser.fullName && (
                <CreateEventModal loggedInUser={loggedInUser} production={production} setProduction={setProduction}/>
            )}
            <Calendar events={events}/>
        </div>
    )
}