import { useEffect, useState } from "react";

export default function Calendar({}) {
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
                        if (d.day === currentDay) {
                            return (
                                <li key={d.key}>
                                    <span className="active">
                                        {d.day}<br/>
                                    </span>
                                </li>
                            )
                        } else {
                            return (
                                <li key={d.key}>
                                    <div>
                                        {d.day}<br/>
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