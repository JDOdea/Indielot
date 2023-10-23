const _apiUrl = "/api/userprofile";

export const fetchUsers = () => {
    return fetch(_apiUrl).then((res) => res.json());
};

export const fetchUserById = (id) => {
    return fetch(_apiUrl + `/${id}`).then((res) => res.json());
} ;