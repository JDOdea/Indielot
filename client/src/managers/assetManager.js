const _apiUrl = "/api/asset";

export const fetchAssets = () => {
    return fetch(_apiUrl).then((res) => res.json());
};

export const fetchAssetById = (id) => {
    return fetch(_apiUrl + `/${id}`).then((res) => res.json());
};

export const fetchAssetsByProductionId = (productionId) => {
    return fetch(_apiUrl + `/production/${productionId}`).then((res) => res.json());
}