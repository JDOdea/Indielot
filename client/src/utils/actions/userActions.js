const _apiUrl = "/api/userprofile";

export default {
    fetchUsers: async () => {
        return await fetch(_apiUrl).then((res) => res.json());
    },
    fetchUserById: async (id) => {
        return await fetch(_apiUrl + `/${id}`).then((res) => res.json());
    }
}