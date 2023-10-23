const _apiUrl = "/api/crew";

export const fetchCrews = () => {
    return fetch(_apiUrl).then((res) => res.json());
};

export const fetchCrewMemberById = (id) => {
    return fetch(_apiUrl + `/${id}`).then((res) => res.json());
};

export const fetchCrewMembersByProductionId = (productionId) => {
    return fetch(_apiUrl + `/production/${productionId}`).then((res) => res.json());
};

export const fetchRoles = () => {
    return fetch(_apiUrl + `/roles`).then((res) => res.json());
};

export const createCrewMember = (crewMember) => {
    return fetch(_apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(crewMember),
    }).then((res) => res.json);
};