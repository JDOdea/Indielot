const _apiUrl = "/api/conversation";

export const fetchConversations = () => {
    return fetch(_apiUrl).then((res) => res.json());
};

export const fetchConversationById = (id) => {
    return fetch(_apiUrl + `/${id}`).then((res) => res.json());
};

export const fetchConversationsByUserId = (userId) => {
    return fetch(_apiUrl + `/user/${userId}`).then((res) => res.json());
};

export const createConversation = (conversation) => {
    return fetch(_apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(conversation),
    }).then((res) => res.json());
};