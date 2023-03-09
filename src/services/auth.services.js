import _api from './api';


export const loginEp = (data) => _api.post("/auth/login", data);
export const verifyEp = () => _api.get("/auth/verify");