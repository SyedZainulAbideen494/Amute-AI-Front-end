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
  getUserTeams: `${API_URL}/getUserTeams`,
  getUserIdByCode: `${API_URL}/getUserByCode`,
  addToTeam: `${API_URL}/addToTeam`,
  updateUserStatus: `${API_URL}/updateUserStatus`,
  getAllTeamMembers: `${API_URL}/getAllTeamMembers`,
  userActiveStatus: `${API_URL}/updateUserActivity`,
  addProfilePic   : `${API_URL}/uploadProfilePic`,
  displayImages: `${API_URL}/images`
};
