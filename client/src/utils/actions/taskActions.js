const _apiUrl = "/api/task";

export default {
    fetchTasks: async () => {
        return await fetch(_apiUrl).then((res) => res.json());
    },
    fetchTaskById: async (id) => {
        return await fetch(_apiUrl + `/${id}`).then((res) => res.json());
    },
    fetchTasksByProductionId: async (productionId) => {
        return await fetch(_apiUrl + `/production/${productionId}`).then((res) => res.json());
    },
    createTask: async (task) => {
        return await fetch(_apiUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(task),
        }).then((res) => res.json());
    },
    updateTask: async (task) => {
        
    },
    deleteTask: async (task) => {
        return fetch(_apiUrl + `/${task.id}`, {
            method: "DELETE"
        });
    }
}