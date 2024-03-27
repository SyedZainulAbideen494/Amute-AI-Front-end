const API_URL = 'http://localhost:8080';

export const API_ROUTES = {
  login: `${API_URL}/login`,
  signup: `${API_URL}/addUser`,
  fetchUserDetails: `${API_URL}/api/fetch/user/info`,
  amuteAi: `${API_URL}/chat/amute/ai`,
  createCompany: `${API_URL}/createCompany`,
  addUserToCompany: `${API_URL}/addUserToCompany`,
  getJoinedCompanies: `${API_URL}/getJoinedCompanies`,
  getUserCompanies: `${API_URL}/getUserCompanies`,
  createTeam: `${API_URL}/createTeam`,
  getUserId: `${API_URL}/getUserId`,
};
