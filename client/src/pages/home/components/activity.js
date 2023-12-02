import { MillToDate } from "../../../utils/date";

export default function Activity({ userImage, username, displayName, text, date, production }) {
    
    return (
        <div className="activity">
            <div className="activityContent-col">
                <div className="activityHeader">
                    <span
                        className="activityHeaderDisplayname"
                    >
                        {displayName}
                    </span>
                    <span className="activityHeaderDate">{MillToDate(date)}</span>
                </div>
                <div className="activityContent">{text}<br /><br />{production}</div>
            </div>
        </div>
    )
}