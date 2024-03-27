import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_ROUTES } from '../app-modules/api_routes';
import './team.css'

const CreateTeam = () => {
  const [teamName, setTeamName] = useState('');
  const [userCompanies, setUserCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch user's companies
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token not found');
      setIsLoading(false);
      return;
    }

    axios.post(API_ROUTES.getUserCompanies, { token })
      .then(response => {
        setUserCompanies(response.data.companies);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching user companies:', error);
        setIsLoading(false);
      });
  }, []);

  const handleCreateTeam = async () => {
    // Fetch user ID based on the provided token
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token not found');
      return;
    }

    const response = await axios.post(API_ROUTES.getUserId, { token });
    const userId = response.data.userId;

    // Insert team details into the database
    const teamData = { name: teamName, companyId: selectedCompany, userId: userId };
    try {
      const teamResponse = await axios.post(API_ROUTES.createTeam, teamData);
      console.log('Team created:', teamResponse.data);
    } catch (error) {
      console.error('Error creating team:', error);
    }
  };

  return (
    <div className="create-team-container"> {/* Apply container class */}
    <input type="text" placeholder="Team Name" value={teamName} onChange={(e) => setTeamName(e.target.value)} />
    <select value={selectedCompany} onChange={(e) => setSelectedCompany(e.target.value)}>
      <option value="">Select Company</option>
      {userCompanies.map(company => (
        <option key={company.id} value={company.id}>{company.name}</option>
      ))}
    </select>
    <button onClick={handleCreateTeam}>Create Team</button>
  </div>
  );
};

export default CreateTeam;