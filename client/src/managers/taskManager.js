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

export const fetchTaskStatuses = () => {
    return fetch(_apiUrl + `/statuses`).then((res) => res.json());
};

export const createTask = (task) => {
    return fetch(_apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(task),
    }).then((res) => res.json());
};

export const updateTask = (task) => {
    
};

export const deleteTask = (task) => {
    return fetch(_apiUrl + `/${task.id}`, {
        method: "DELETE"
    });
};