const _apiUrl = "/api/task";

export const fetchTasks = () => {
    return fetch(_apiUrl).then((res) => res.json());
};

export const fetchTaskById = (id) => {
    return fetch(_apiUrl + `/${id}`).then((res) => res.json());
};

export const fetchTasksByProductionId = (productionId) => {
    return fetch(_apiUrl + `/production/${productionId}`).then((res) => res.json());
};

