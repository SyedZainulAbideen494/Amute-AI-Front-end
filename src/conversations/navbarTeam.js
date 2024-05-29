import React, { useState, useEffect } from "react";
import { API_ROUTES } from "../app-modules/api_routes";
import helpicon from '../images/icons8-help-50.png';
import joinedevents from '../images/joined-events.png'
import myevents from '../images/my-events.png'
import porfileicon from '../images/icons8-user-profile-48.png';
import dashboardicon from '../images/icons8-dashboard-50.png';
import { Link, useNavigate, useLocation } from "react-router-dom";
import logoutImg from '../images/logout.png'
import loginImg from '../images/login.png'
import profilepic from '../images/icons8-user-profile-48.png'
import member_img from '../images/user.png'
import add_member_img from '../images/user-add.png'
import msgicon from '../images/icons8-messages-50.png'

const NavBarTeam = () => {
    const [userInfo, setUserInfo] = useState([]);
    const [showNav, setShowNav] = useState(false);
    const [auth, setauth] = useState(false);
    const nav = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.reload(); // Reload the page after logout
      };
  useEffect(() => {
    if (localStorage.getItem("token")) {
      setauth(true);
    }
  }, []);
  useEffect(() => {
    if (localStorage.getItem("token")) {
      setauth(true);
    } else {
      setauth(false);
      
    }
  }, []);

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

    const handleMembersPageRedirect = () => {
        nav('/members')
    }
    const handledashboardPageRedirect = () => {
        nav('/dashboard')
    }
    const handleAddMemberRedirect = () => {
        nav('/addmember')
    }

    const handleConversationsRedirect = () => {
        nav('/conversations')
    }

    const handleMyProfileRedirect = () => {
        nav('/MyProfile')
    }

    const handleHelpRedirect = () => {
        nav('/help')
    }

    const handleLoginPageRedirect = () => {
        nav('/login')
    }


    const isActive = (path) => {
        return location.pathname === path ? 'active' : '';
    };


    return (
        <div>
            <div className={`left-sidebar_team ${showNav ? 'show-nav' : ''}`}>
                <div className="welcome-message_team">Amute</div>
                <div className="nav-buttons_team">
                    <button className={`nav-button_team ${isActive('/dashboard')}`} onClick={handledashboardPageRedirect}>
                        <img src={dashboardicon} alt="Dashboard" className="nav-icon" />
                        Dashboard
                    </button>
                    <button className={`nav-button_team ${isActive('/members')}`} onClick={handleMembersPageRedirect}>
                        <img src={member_img} alt="Team" className="nav-icon" />
                        Members
                    </button>
                    <button className={`nav-button_team ${isActive('/addmember')}`} onClick={handleAddMemberRedirect}>
                        <img src={add_member_img} alt="Tasks" className="nav-icon" />
                        Add Members
                    </button>
                    <button className={`nav-button_team ${isActive('/conversations')}`} onClick={handleConversationsRedirect}>
                        <img src={msgicon} alt="Messages" className="nav-icon" />
                        Conversations Initiated
                    </button>
                    <button className={`nav-button_team ${isActive('/MyProfile')}`} onClick={handleMyProfileRedirect}>
                    <img src={profilepic} style={{borderRadius: '50%'}} alt="Profile" className="nav-icon" />
                        My Profile
                    </button>
                    <button className={`nav-button_team ${isActive('/help')}`} onClick={handleHelpRedirect}>
                        <img src={helpicon} alt="Help" className="nav-icon" />
                        Help
                    </button>
                    {auth ? (
              <button className="nav-button_team" onClick={handleLogout}>
              <img src={logoutImg} alt="Help" className="nav-icon" />
              Logout
          </button>
            ) : (
                <button className="nav-button_team" onClick={handleLoginPageRedirect}>
                <img src={loginImg} alt="Help" className="nav-icon" />
                    Login
                    </button>
            )}
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
