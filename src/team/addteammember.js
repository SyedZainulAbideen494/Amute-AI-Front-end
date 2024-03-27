import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_ROUTES } from '../app-modules/api_routes';
import './team.css';

const AddTeamMember = () => {
  const [uniqueCode, setUniqueCode] = useState('');
  const [userTeams, setUserTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    // Fetch user's teams
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token not found');
      setIsLoading(false);
      return;
    }

    axios.post(API_ROUTES.getUserTeams, { token })
      .then(response => {
        setUserTeams(response.data.teams);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching user teams:', error);
        setIsLoading(false);
      });
  }, []);

  const handleAddToTeam = async () => {
    // Fetch user ID based on the provided token
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token not found');
      return;
    }

    const response = await axios.post(API_ROUTES.getUserId, { token });
    const userId = response.data.userId;

    // Fetch team ID based on the selected team name
    const teamId = selectedTeam; // Assuming the team ID is directly provided

    // Fetch user ID based on the unique code
    try {
      const userResponse = await axios.post(API_ROUTES.getUserIdByCode, { code: uniqueCode });
      const memberId = userResponse.data.userId;

      // Add the user to the selected team
      const addToTeamResponse = await axios.post(API_ROUTES.addToTeam, { teamId, userId: memberId });
      console.log('User added to team:', addToTeamResponse.data);

      // Update the status of the user from unique code to "joined"
      const updateStatusResponse = await axios.post(API_ROUTES.updateUserStatus, { userId: memberId, status: 'joined' });
      console.log('User status updated:', updateStatusResponse.data);

      // Show success message
      setSuccessMsg('User added to team successfully!');
    } catch (error) {
      console.error('Error adding user to team:', error);
    }
  };

  return (
    <div className="add-team-member-container">
      <input type="text" placeholder="Enter Unique Code" value={uniqueCode} onChange={(e) => setUniqueCode(e.target.value)} />
      <select value={selectedTeam} onChange={(e) => setSelectedTeam(e.target.value)}>
        <option value="">Select Team</option>
        {userTeams.map(team => (
          <option key={team.id} value={team.id}>{team.name}</option>
        ))}
      </select>
      <button onClick={handleAddToTeam}>Add to Team</button>
      <p className="success-msg">{successMsg}</p>
    </div>
  );
};

export default AddTeamMember;