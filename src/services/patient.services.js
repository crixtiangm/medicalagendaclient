import _api from './api';

export const registerPatientEp = (data) => _api.post('/patient/register-patient', data);
export const patientListEp = () => _api.get('/patient/patient-list');