import React, { useState, useEffect } from "react";
import './home.css';
import { API_ROUTES } from "../app-modules/api_routes";
import helpicon from '../images/icons8-help-50.png';
import joinedevents from '../images/joined-events.png'
import myevents from '../images/my-events.png'
import porfileicon from '../images/icons8-user-profile-48.png';
import dashboardicon from '../images/icons8-dashboard-50.png';
import add from '../images/add+.png'
import { Link, useNavigate, useLocation } from "react-router-dom";
import logoutImg from '../images/logout.png'
import loginImg from '../images/login.png'

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
      nav('/login')
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

    const handleHostEventPageRedirect = () => {
        nav('/host/new/event')
    }
    const handledashboardPageRedirect = () => {
        nav('/dashboard')
    }
    const handleMyEventsRedirect = () => {
        nav('/MyEvents')
    }

    const handleJoinedEventsRedirect = () => {
        nav('/joinedEvents')
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
                <div className="welcome-message_team">Welcome, {userInfo.name}!</div>
                <div className="nav-buttons_team">
                    <button className={`nav-button_team ${isActive('/dashboard')}`} onClick={handledashboardPageRedirect}>
                        <img src={dashboardicon} alt="Dashboard" className="nav-icon" />
                        Dashboard
                    </button>
                    <button className={`nav-button_team ${isActive('/host/new/event')}`} onClick={handleHostEventPageRedirect}>
                        <img src={add} alt="Team" className="nav-icon" />
                        Host
                    </button>
                    <button className={`nav-button_team ${isActive('/MyEvents')}`} onClick={handleMyEventsRedirect}>
                        <img src={myevents} alt="Tasks" className="nav-icon" />
                        My Events
                    </button>
                    <button className={`nav-button_team ${isActive('/joinedEvents')}`} onClick={handleJoinedEventsRedirect}>
                        <img src={joinedevents} alt="Messages" className="nav-icon" />
                        joined Events 
                    </button>
                    <button className={`nav-button_team ${isActive('/MyProfile')}`} onClick={handleMyProfileRedirect}>
                    <img src={`${API_ROUTES.displayImages}/${userInfo.profilePic}`} style={{borderRadius: '50%'}} alt="Profile" className="nav-icon" />
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
