const _apiUrl = "/api/location";

export const fetchLocations = () => {
    return fetch(_apiUrl).then((res) => res.json());
};

export const fetchLocationById = (id) => {
    return fetch(_apiUrl + `/${id}`).then((res) => res.json());
};

export const fetchLocationsByProductionId = (productionId) => {
    return fetch(_apiUrl + `/production/${productionId}`).then((res) => res.json());
};

export const createLocation = (location) => {
    return fetch(_apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(location),
    }).then((res) => res.json);
};