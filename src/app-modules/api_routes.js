const API_URL = 'http://localhost:8080';

export const API_ROUTES = {
  displayImages: `${API_URL}/images`,
  addMember: `${API_URL}/addMembers`,
  displayMember: `${API_URL}/display/members`,
  getVacancies: `${API_URL}/api/vacancies`,
  getAdvanceTickets: `${API_URL}/advance_tickets`,
  getPhoneNumbers: `${API_URL}/api/phone-numbers`,
  editMember: `${API_URL}/edit/member`,
  deleteMember: `${API_URL}/api/insertVacatingMember`,
  vacancies: `${API_URL}/api/vacancies`,
  availableBeds: `${API_URL}/api/available-beds`,
  dolwnloadAPK: `${API_URL}/download/myapp.apk`,
  shiftMember: `${API_URL}/api/shiftMember`,
  fetchBeds: `${API_URL}/beds`
};
