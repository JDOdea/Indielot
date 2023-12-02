const _apiUrl = "/api/crew";

export default {
    fetchCrews: async () => {
        return await fetch(_apiUrl).then((res) => res.json());
    },
    fetchCrewMemberById: async (id) => {
        return await fetch(_apiUrl + `/${id}`).then((res) => res.json());
    },
    fetchCrewMembersByProductionId: async (productionId) => {
        return await fetch(_apiUrl + `/production/${productionId}`).then((res) => res.json());
    },
    fetchRoles: async () => {
        return await fetch(_apiUrl + `/roles`).then((res) => res.json());
    },
    createCrewMember: async (crewMember) => {
        return await fetch(_apiUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(crewMember),
        }).then((res) => res.json());
    },
    updateCrewMember: async (crewMember) => {
        return await fetch(_apiUrl + `/${crewMember.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(crewMember)
        });
    },
    deleteCrewMember: async (crewMember) => {
        return fetch(_apiUrl + `/${crewMember.id}`, {
            method: "DELETE"
        });
    }
}