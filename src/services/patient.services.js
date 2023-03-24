import _api from './api';

export const registerPatientEp = (data) => _api.post('/patient/register-patient', data);