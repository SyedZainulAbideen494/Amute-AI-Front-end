const API_URL = 'http://localhost:8080';

export const API_ROUTES = {
  login: `${API_URL}/login`,
  signup: `${API_URL}/addUser`,
  fetchUserDetails: `${API_URL}/api/fetch/user/info`,
  addProfilePic   : `${API_URL}/uploadProfilePic`,
  displayImages: `${API_URL}/images`,
  addQueue: `${API_URL}/add/queue`
};
