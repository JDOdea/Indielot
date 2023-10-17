const _apiUrl = "/api/production";

export const fetchProductions = () => {
    return fetch(_apiUrl).then((res) => res.json());
};

