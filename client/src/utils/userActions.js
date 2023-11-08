const _apiUrl = "/api/auth";

export default {
    fetchUser: async () => {
        return await fetch(_apiUrl + "/me", {
            credentials: "include",
        }).then((res) => {
            return res.status === 401 ? Promise.resolve(null) : res.json();
        });
    },
    logOut: async (token) => {
        try {
            const res = await fetch(_apiUrl + "/logout");
        } catch (error) {
            console.log(error);
        }
    },
    logIn: async (email, password) => {
        try {
            const res = await fetch(_apiUrl + "/login", {
                method: "POST",
                credentials: "same-origin",
                headers: {
                    Authorization: `Basic ${btoa(`${email}:${password}`)}`,
                },
            })
            const data = await res.json();
            if (res.ok) {
                return this.fetchUser();
            } else {
                return Promise.resolve(null);
            }
            /* .then((res) => {
                if (res.status !== 200) {
                    return Promise.resolve(null);
                } else {
                    return this.fetchToken();
                };
            }); */
        } catch (error) {
            console.log(error);
        }
    },
    tryGetLoggedInUser: async () => {
        try {
            return fetch(_apiUrl + "/me").then((res) => {
                return res.status === 401 ? Promise.resolve(null) : res.json();
            });
        } catch (error) {
            console.log(error);
        }
    }
}