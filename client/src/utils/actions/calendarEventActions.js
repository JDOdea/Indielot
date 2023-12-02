const _apiUrl = "/api/calendarevent";

export default {
    fetchCalendarEvents: async () => {
        return await fetch(_apiUrl).then((res) => res.json());
    },
    fetchEventById: async (id) => {
        return await fetch(_apiUrl + `/${id}`).then((res) => res.json());
    },
    fetchEventsByProductionId: async (productionId) => {
        return await fetch(_apiUrl + `/production/${productionId}`).then((res) => res.json());
    },
    createEvent: async (event) => {
        return await fetch(_apiUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(event)
        }).then((res) => res.json());
    }
}