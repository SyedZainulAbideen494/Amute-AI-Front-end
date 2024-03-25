import React, { useState, useEffect } from "react";
import './home.css';
import { API_ROUTES } from "../app-modules/api_routes";
import helpicon from '../images/icons8-help-50.png';
import messageicon from '../images/icons8-messages-50.png';
import performaceicon from '../images/icons8-performance-24.png';
import taskicon from '../images/icons8-tasks-24.png';
import teamicon from '../images/icons8-team-24.png';
import porfileicon from '../images/icons8-user-profile-48.png';
import dashboardicon from '../images/icons8-dashboard-50.png';

const NavBarTeam = () => {
    const [userInfo, setUserInfo] = useState([]);
    const [showNav, setShowNav] = useState(false); // State to toggle navigation bar

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (!token) {
            console.error('Token not found');
            return;
        }

        fetch(API_ROUTES.fetchUserDetails, {
            method: 'GET',
            headers: {
                'Authorization': token
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                console.error('Error fetching user:', data.error);
                return;
            }
            setUserInfo(data);
        })
        .catch(error => {
            console.error('Error fetching user:', error);
        });
    }, []);

    return (
        <div className={`left-sidebar_team ${showNav ? 'active' : ''}`}>
            <div className="welcome-message_team">Welcome, {userInfo.name}!</div>
            <div className="nav-buttons_team">
                <button className="nav-button_team">
                    <img src={dashboardicon} alt="Dashboard" className="nav-icon" />
                    Dashboard
                </button>
                <button className="nav-button_team">
                    <img src={teamicon} alt="Team" className="nav-icon" />
                    Team
                </button>
                <button className="nav-button_team">
                    <img src={taskicon} alt="Tasks" className="nav-icon" />
                    Tasks
                </button>
                <button className="nav-button_team">
                    <img src={messageicon} alt="Messages" className="nav-icon" />
                    Messages
                </button>
                <button className="nav-button_team">
                    <img src={performaceicon} alt="Performance" className="nav-icon" />
                    My Performance
                </button>
                <button className="nav-button_team">
                    <img src={porfileicon} alt="Profile" className="nav-icon" />
                    My Profile
                </button>
                <button className="nav-button_team">
                    <img src={helpicon} alt="Help" className="nav-icon" />
                    Help
                </button>
            </div>
        </div>
    );
}

export default NavBarTeam;