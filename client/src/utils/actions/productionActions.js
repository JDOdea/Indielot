const _apiUrl = "/api/production";

export default {
    fetchProductions: async () => {
        return await fetch(_apiUrl).then((res) => res.json());
    },
    fetchProductionById: async (id) => {
        return await fetch(_apiUrl + `/${id}`).then((res) => res.json());
    },
    fetchProductionsByUserId: async (userId) => {
        return await fetch(_apiUrl + `/user/${userId}`).then((res) => res.json());
    },
    fetchActiveProductionsByUserId: async (userId) => {
        return await fetch(_apiUrl + `/user/${userId}/active`).then((res) => res.json());
    },
    postProduction: async (production) => {
        return await fetch(_apiUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(production)
        }).then((res) => res.json());
    },
    updateProduction: async (production) => {
        return await fetch(_apiUrl + `/${production.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(production)
        });
    },
    deleteProduction: async (productionId) => {
        return await fetch(_apiUrl + `/${productionId}`, {
            method: "DELETE",
        });
    }
}