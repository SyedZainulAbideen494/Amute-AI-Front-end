import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { API_ROUTES } from '../../app-modules/api_routes';
import './manageTeam.css'; // Import CSS file for styling

function DisplaySpecificTeamMemberComponent() {
    const { id } = useParams();
    const [teamMembers, setTeamMembers] = useState([]);
    const [selectedMember, setSelectedMember] = useState(null); // To track which member's options are selected

    useEffect(() => {
        const fetchTeamMembers = async () => {
            try {
                const response = await axios.post(API_ROUTES.getSpecifyTeamMembers, { teamId: id });
                setTeamMembers(response.data);
            } catch (error) {
                console.error('Error fetching team members:', error);
            }
        };

        fetchTeamMembers();
    }, [id]);

    const handleAction = (memberId, action) => {
        // Handle the action (e.g., change role to leader or remove from the team)
        console.log(`Member ID: ${memberId}, Action: ${action}`);
        setSelectedMember(null); // Close dropdown after action is performed
    };

    const toggleDropdown = (memberId) => {
        setSelectedMember(selectedMember === memberId ? null : memberId); // Toggle dropdown visibility
    };

    return (
        <div className="team-members-container">
            <h3>Team Members</h3>
            <div className="team-members-list">
                {teamMembers.map((member) => (
                    <div className="team-member" key={member.id}>
                        <img src={`${API_ROUTES.displayImages}/${member.profilePic}`} alt={member.name} />
                        <div>
                            <h2>{member.name}</h2>
                            <p><strong>Role:</strong> {member.role}</p>
                            <p><strong>Position:</strong> {member.position}</p>
                        </div>
                        <div className="member-options">
                            <button className="options-btn" onClick={() => toggleDropdown(member.id)}>&#8942;</button>
                            {selectedMember === member.id && (
                                <div className="dropdown-content">
                                    <button onClick={() => handleAction(member.id, 'changeRole')}>Change to Leader</button>
                                    <button onClick={() => handleAction(member.id, 'removeFromTeam')}>Remove from Team</button>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default DisplaySpecificTeamMemberComponent;