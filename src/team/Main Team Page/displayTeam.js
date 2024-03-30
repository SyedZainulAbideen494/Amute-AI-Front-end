import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_ROUTES } from '../../app-modules/api_routes';
import './team.css'
import { Link } from 'react-router-dom';

const DisplayTeam = () => {
  const [userTeams, setUserTeams] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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

  return (
    <div className="team-container">
    {isLoading ? (
      <p>Loading...</p>
    ) : (
      userTeams.map(team => (
        <div key={team.id} className="team-box">
          <Link to={`/team/${team.id}`} style={{textDecoration: 'none'}}>
          <p className="team-name">{team.name}</p>
          </Link>
        </div>
      ))
    )}
  </div>
  );
};

export default DisplayTeam;