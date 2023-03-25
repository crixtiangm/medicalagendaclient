import _api from './api';

export const regiterClinicHistoryEp = (data) => _api.post('/clinichistory/register-clinichistory',data);