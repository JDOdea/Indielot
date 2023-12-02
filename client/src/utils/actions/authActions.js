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
    logIn: async function (email, password) {
        try {
            return await fetch(_apiUrl + "/login", {
                method: "POST",
                credentials: "same-origin",
                headers: {
                    Authorization: `Basic ${btoa(`${email}:${password}`)}`,
                },
            }).then((res) => {
                if (res.status === 200) {
                    return this.tryGetLoggedInUser();
                } else {
                    return Promise.resolve(null);
                }
            })
        } catch (error) {
            console.log(error);
        }
    },
    tryGetLoggedInUser: async function () {
        try {
            return fetch(_apiUrl + "/me").then((res) => {
                return res.status === 401 ? Promise.resolve(null) : res.json();
            });
        } catch (error) {
            console.log(error);
        }
    },
    register: async (userProfile) => {
        userProfile.password = btoa(userProfile.password);
        return await fetch(_apiUrl + "/register", {
            credentials: "same-origin",
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userProfile),
        }).then(() => fetch(_apiUrl + "/me").then((res) => res.json()));
    }
}