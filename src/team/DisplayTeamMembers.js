import React, { useState, useEffect } from "react";
import axios from 'axios';
import './team.css'
import { API_ROUTES } from "../app-modules/api_routes";

const DisplayTeamMembers = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [userDetails, setUserDetails] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            console.error('Token not found');
            setIsLoading(false);
            return;
        }
    
        axios.post(API_ROUTES.getAllTeamMembers, { token })
            .then(response => {
                // Filter out duplicate user IDs
                const uniqueUserDetails = removeDuplicates(response.data.users, 'id');
                setUserDetails(uniqueUserDetails);
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Error fetching team members:', error);
                setIsLoading(false);
            });
    }, []);

    // Function to remove duplicates from an array of objects based on a specified key
    const removeDuplicates = (arr, key) => {
        return arr.reduce((acc, current) => {
            const x = acc.find(item => item[key] === current[key]);
            if (!x) {
                return acc.concat([current]);
            } else {
                return acc;
            }
        }, []);
    };

    return (
        <div className="team-members-container">
        {isLoading ? (
            <p>Loading...</p>
        ) : (
            <div>
                <h2 className="team-members-title">Team Members</h2>
                <ul className="team-members-list">
                {userDetails.map(user => (
    <li key={user.id} className="team-member-item">
      <img src={`${API_ROUTES.displayImages}/${user.profilePic}`} alt={user.name} className="member-profile-pic" />
        <div className="member-details">
            <p className="member-name">{user.name}</p>
            <p className="member-role">{user.role}</p>
        </div>
        <div className="member-status">
            <div className={`active-dot ${user.active ? 'active' : 'inactive'}`}></div>
            <span className={`active-status ${user.active ? 'active' : 'inactive'}`}>{user.active ? '' : ''}</span>
        </div>
        <p className="member-position">{user.position}</p>
    </li>
))}
                </ul>
            </div>
        )}
    </div>
    );
}

export default DisplayTeamMembers;