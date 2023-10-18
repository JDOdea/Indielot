const _apiUrl = "/api/production";

export const fetchProductions = () => {
    return fetch(_apiUrl).then((res) => res.json());
};

export const fetchProductionById = (id) => {
    return fetch(_apiUrl + `/${id}`).then((res) => res.json());
};

export const postProduction = (production) => {
    return fetch(_apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(production)
    }).then((res) => res.json);
}