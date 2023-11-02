import { useEffect, useState } from "react";

export default function Calendar({ events }) {
    const [year, setYear] = useState(0);
    const [month, setMonth] = useState("");
    const [days, setDays] = useState([]);
    const [weekDay, setWeekDay] = useState(null);
    const [currentDay, setCurrentDay] = useState(null);

    const date = new Date();
    const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];


    const getDaysInMonth = () => {
        // Calculate the start date of the month, end date of the month, starting weekday, and number of days
        const firstDayOfMonth = new Date(year, months.indexOf(month), 1);
        const lastDayOfMonth = new Date(year, months.indexOf(month) + 1, 0);
        const startingDay = firstDayOfMonth.getDay();
        const numberOfDays = lastDayOfMonth.getDate();

        // Create an array to represent the weekdays
        const daysArray = Array.from({ length: 42 }, (_, i) => {
            if (i < startingDay || i >= startingDay + numberOfDays) {
                return { day: null, key: `empty-${i}`}; // Empty days before the first day of the month and after the last day
            } else {
                return { day: i - startingDay + 1, key: `day-${i}`} // Days of the month
            }
        });

        setDays(daysArray);
    };

    // Function to check if an event exists for a given day
    const hasEvent = (day) => {
        // Check if there are events on the given day
        const eventsOnDay = events.filter((e) => {
            const eventStartDate = new Date(e.startDate);
            const eventEndDate = new Date(e.endDate);
            const dayDate = new Date(year, months.indexOf(month), day);

            // Check if the day falls within the event's start and end dates
            return dayDate >= eventStartDate && dayDate <= eventEndDate;
        });

        return eventsOnDay.length > 0;
    }

    // Function to get corresponding event objects
    const getEvents = (day) => {
        // Check if there are events on the given day
        const eventsOnDay = events.filter((e) => {
            const eventStartDate = new Date(e.startDate);
            const eventEndDate = new Date(e.endDate);
            const dayDate = new Date(year, months.indexOf(month), day);

            // Check if the day falls within the event's start and end dates
            return dayDate >= eventStartDate && dayDate <= eventEndDate;
        });

        return eventsOnDay;
    }

    useEffect(() => {
        setYear(new Date().getFullYear());
        setMonth(months[date.getMonth()]);
        setWeekDay(date.getDay());
        setCurrentDay(date.getDate());
    }, []);

    useEffect(() => {
        if (year && month !== "") {
            getDaysInMonth();
        }
    }, [year, month]);
    
    if (!events) return;
    return (
        <div className="productionScheduleContainer">
            <div className="calendar">
                <div className="month">
                    <ul>
                        <li className="prev">&#10094;</li>
                        <li className="next">&#10095;</li>
                        <li>{month}<br /><span style={{ fontSize: "18px" }}>{year}</span></li>
                    </ul>
                </div>
                <ul className="weekdays">
                    {weekdays.map((d) => (
                        <li key={d}>{d}</li>
                    ))}
                </ul>
                <ul className="days">
                    {days.map((d) => {
                        const eventExists = hasEvent(d.day);
                        if (d.day === currentDay) {
                            return (
                                <li key={d.key}>
                                    <span className={`active day ${eventExists ? 'has-event' : ''}`}>
                                        {eventExists ? (
                                            <div className="calendarDay">
                                                {d.day}<br/>
                                                {getEvents(d.day)}
                                            </div>
                                        ) : (
                                            <div className="calendarDay">
                                                {d.day}<br/>
                                            </div>
                                        )}
                                    </span>
                                </li>
                            )
                        } else {
                            return (
                                <li key={d.key}>
                                    <div className="day">
                                        {eventExists ? (
                                            <div className="calendarDay">
                                                {d.day}<br/>
                                                {getEvents(d.day).map((e) => (
                                                    <div key={e.id} className="calendar-event-description">
                                                        <span className="event-dot">●</span>
                                                        <span>
                                                            {e.title}
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <div className="calendarDay">
                                                {d.day}<br/>
                                            </div>
                                        )}
                                    </div>
                                </li>
                            )
                        }
                    })}
                </ul>
            </div>
        </div>
    )
}