const _apiUrl = "/api/activity";

export const fetchActivity = () => {
    return fetch(_apiUrl).then((res) => res.json());
};

export const fetchActivityById = (id) => {
    return fetch(_apiUrl + `/${id}`).then((res) => res.json());
};

export const fetchActivityByUserId = (userId) => {
    return fetch(_apiUrl + `/user/${userId}`).then((res) => res.json());
};