import _api from "./api";

export const addPatientEp = (data) => _api.post('/scheduled/agenda', data);
export const listPatientEp = () => _api.get('/scheduled/agenda-list');
export const editPatientEp = (data) => _api.patch(`/scheduled/${data._id}/edit`, data);
export const deletePatientEp = (eventId) => _api.delete(`/scheduled/${eventId}/delete`);