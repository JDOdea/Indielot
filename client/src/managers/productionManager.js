const _apiUrl = "/api/production";

export const fetchProductions = () => {
    return fetch(_apiUrl).then((res) => res.json());
};

export const fetchProductionById = (id) => {
    return fetch(_apiUrl + `/${id}`).then((res) => res.json());
};

export const fetchProductionsByUserId = (userId) => {
    return fetch(_apiUrl + `/user/${userId}`).then((res) => res.json());
};

export const postProduction = (production) => {
    return fetch(_apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(production)
    }).then((res) => res.json());
};

export const updateProduction = (production) => {
    return fetch(_apiUrl + `/${production.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(production)
    });
};

export const deleteProduction = (productionId) => {
    return fetch(_apiUrl + `/${productionId}`, {
        method: "DELETE",
    });
};