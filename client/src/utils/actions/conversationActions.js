const _apiUrl = "/api/conversation";

export default {
    fetchConversations: async () => {
        return await fetch(_apiUrl).then((res) => res.json());
    },
    fetchConversationsById: async (id) => {
        return await fetch(_apiUrl + `/${id}`).then((res) => res.json());
    },
    fetchConversationsByUserId: async (userId) => {
        return await fetch(_apiUrl + `/user/${userId}`).then((res) => res.json());
    },
    createConversation: async (conversation) => {
        return await fetch(_apiUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(conversation)
        }).then((res) => res.json());
    }
}