const _apiUrl = "/api/location";

export default {
    fetchLocations: async () => {
        return await fetch(_apiUrl).then((res) => res.json());
    },
    fetchLocationsById: async (id) => {
        return await fetch(_apiUrl + `/${id}`).then((res) => res.json());
    },
    fetchLocationsByProductionId: async (productionId) => {
        return await fetch(_apiUrl + `/production/${productionId}`).then((res) => res.json());
    },
    createLocation: async (location) => {
        return await fetch(_apiUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(location),
        }).then((res) => res.json());
    },
    updateLocation: async (location) => {
        return await fetch(_apiUrl + `/${crewMember.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(location)
        });
    },
    deleteLocation: async (location) => {
        return fetch(_apiUrl + `/${location.id}`, {
            method: "DELETE"
        });
    }
}