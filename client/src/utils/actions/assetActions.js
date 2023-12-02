const _apiUrl = "/api/asset";

export default {
    fetchAssets: async () => {
        return await fetch(_apiUrl).then((res) => res.json());
    },
    fetchAssetById: async (id) => {
        return await fetch(_apiUrl + `/${id}`).then((res) => res.json());
    },
    fetchAssetsByProductionId: async (productionId) => {
        return await fetch(_apiUrl + `/production/${productionId}`).then((res) => res.json());
    },
    fetchTypes: async () => {
        return await fetch(_apiUrl + `/types`).then((res) => res.json());
    },
    createAsset: async (asset) => {
        return await fetch(_apiUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(asset)
        }).then((res) => res.json());
    },
    updateAsset: async (asset) => {
        return await fetch(_apiUrl + `/${asset.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(asset)
        });
    },
    deleteAsset: async (asset) => {
        return await fetch(_apiUrl + `/${asset.id}`, {
            method: "DELETE"
        });
    }
}