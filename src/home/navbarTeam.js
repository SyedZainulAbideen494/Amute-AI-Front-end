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
import { Link, useNavigate, useLocation } from "react-router-dom";

const NavBarTeam = () => {
    const [userInfo, setUserInfo] = useState([]);
    const [showNav, setShowNav] = useState(false);
    const nav = useNavigate()
    const location = useLocation(); // Use useLocation hook
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

    const toggleNav = () => {
        setShowNav(!showNav);
    };

    const handleTeamPageRedirect = () => {
        nav('/team')
    }
    const handledashboardPageRedirect = () => {
        nav('/dashboard')
    }

    const isActive = (path) => {
        return location.pathname === path ? 'active' : '';
    };

    return (
        <div>
            <div className={`left-sidebar_team ${showNav ? 'show-nav' : ''}`}>
                <div className="welcome-message_team">Welcome, {userInfo.name}!</div>
                <div className="nav-buttons_team">
                    <button className={`nav-button_team ${isActive('/dashboard')}`} onClick={handledashboardPageRedirect}>
                        <img src={dashboardicon} alt="Dashboard" className="nav-icon" />
                        Dashboard
                    </button>
                    <button className={`nav-button_team ${isActive('/team')}`} onClick={handleTeamPageRedirect}>
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
                    {userInfo.role === 'Leader' ? (
                        <button className="nav-button_team">
                            <img src={performaceicon} alt="Team Performance" className="nav-icon" />
                            Team Performance
                        </button>
                    ) : (
                        <button className="nav-button_team">
                            <img src={performaceicon} alt="My Performance" className="nav-icon" />
                            My Performance
                        </button>
                    )}
                    <button className="nav-button_team">
                    <img src={`${API_ROUTES.displayImages}/${userInfo.profilePic}`} style={{borderRadius: '50%'}} alt="Profile" className="nav-icon" />
                        My Profile
                    </button>
                    <button className="nav-button_team">
                        <img src={helpicon} alt="Help" className="nav-icon" />
                        Help
                    </button>
                </div>
            </div>
            <div className="menu-toggle" onClick={toggleNav}>
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="3" y1="12" x2="21" y2="12"></line>
        <line x1="3" y1="6" x2="21" y2="6"></line>
        <line x1="3" y1="18" x2="21" y2="18"></line>
    </svg>
</div>
        </div>
    );
}

export default NavBarTeam;
