import _api from './api';

export const singupEp = (data) => _api.post("/collaborator/signup-collaborator", data);
export const collaboratorEp = (data) => _api.post('/collaborator/data-collaborator', data);