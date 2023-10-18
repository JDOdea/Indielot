const _apiUrl = "/api/production";

export const fetchProductions = () => {
    return fetch(_apiUrl).then((res) => res.json());
};

export const fetchProductionById = (id) => {
    return fetch(_apiUrl + `/${id}`).then((res) => res.json());
};