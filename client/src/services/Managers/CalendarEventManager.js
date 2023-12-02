const _apiUrl = "/api/calendarevent";

export const fetchCalendarEvents = () => {
    return fetch(_apiUrl).then((res) => res.json());
};

export const fetchEventById = (id) => {
    return fetch(_apiUrl + `/${id}`).then((res) => res.json());
};

export const fetchEventsByProductionId = (productionId) => {
    return fetch(_apiUrl + `/production/${productionId}`).then((res) => res.json());
};

export const createEvent = (event) => {
    return fetch(_apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(event),
    }).then((res) => res.json());
};