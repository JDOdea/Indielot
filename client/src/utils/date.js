export function DisplayDateTime({ date }) {
    const displayDate = new Date(date).toUTCString().slice(0, 16);
    const displayTime = new Date(date).toLocaleDateString().slice(0, 23);
    return `${displayTime} ${displayDate}`
}

export function MillToDate(ms) {
    const dateInMs = new Date(ms).getTime();
    var milliseconds = Date.now() - dateInMs;
    var seconds = Math.floor(milliseconds / 1000);
    var minutes = Math.floor(milliseconds / 60000);
    var hours = Math.floor(milliseconds / 60000 / 60);
    var days = Math.floor(milliseconds / 60000 / 60 / 24);

    if (days >= 7) return Math.floor(days / 7) + "w";
    else if (hours >= 24) return Math.floor(hours / 24) + "d";
    else if (minutes >= 60) return Math.floor(minutes / 60) + "h";
    else if (seconds >= 60) return Math.floor(seconds / 60) + "m";
    else return Math.floor(seconds) + "s";
}