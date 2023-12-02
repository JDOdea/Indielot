const _apiUrl = "/api/activity";

export default {
    fetchActivity: async () => {
        return await fetch(_apiUrl).then((res) => res.json());
    },
    fetchActivityById: async (id) => {
        return await fetch(_apiUrl + `/${id}`).then((res) => res.json());
    },
    fetchActivityByUserId: async (userId) => {
        return await fetch(_apiUrl + `/user/${userId}`).then((res) => res.json());
    }
}