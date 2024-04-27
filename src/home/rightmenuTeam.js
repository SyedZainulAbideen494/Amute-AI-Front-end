import React, { useState, useEffect } from "react";
import './home.css';
import { API_ROUTES } from "../app-modules/api_routes";
import arrowDown from '../images/icons8-arrow-down.png';
import arrowUp from '../images/icons8-arrow-up.png';
import Calander from "./calander";
import backIcon from '../images/icons8-arrow-left.png';
import { Link, useNavigate } from "react-router-dom";

const QuickShare = ({ status }) => {
    const handleShare = async () => {
      if (navigator.share) {
        try {
          await navigator.share({
            title: 'Share Status Code',
            text: `Add me to the team with this code: ${status}`,
          });
        } catch (error) {
          console.error('Error sharing status code:', error);
        }
      } else {
        // Fallback for browsers that don't support Web Share API
        const shareText = `Join my team with this status code: ${status}`;
        const shareURL = `whatsapp://send?text=${encodeURIComponent(shareText)}`;
        window.location.href = shareURL;
      }
    };
  
    return (
        <div className="quick-share-container">
        <button className="quick-share-button" onClick={handleShare}>{status} Share</button>
      </div>
    );
  };

const RightMenuSummary = () => {
    const [userInfo, setUserInfo] = useState([]);
    const [isAccountOpen, setisAccountOpen] = useState(false);
    const [auth, setauth] = useState(false);
    const nav = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem("token");
        // Redirect the user to the login page
        nav("/login");
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
  if (auth === false) {
    nav("/login");
  }
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


      const toggleAccount = () => {
        setisAccountOpen(!isAccountOpen);
      };


    return (
        <div className="rightmenu_summary_main_div">
             <div className="right_menu_summary_header">
             <Link to='/dashboard'>
    <img src={backIcon} alt="Back" className="back_button_Right_menu_mobile"/>
    </Link>
    <h2>Summary</h2>
  </div>
                <div className="team_details_summary_menu">
                    <div className="team_details_summary_header" onClick={toggleAccount}>
                        <h3>Account</h3>
                        <img src={isAccountOpen ? arrowUp : arrowDown} alt="Toggle Arrow" className="toggle_arrow" />
                    </div>
                    {isAccountOpen && (
                       <p style={{marginLeft: '10px', cursor: 'pointer'}} onClick={handleLogout}>Logout</p>
                    )}
                </div>
            </div>
    );
}

export default RightMenuSummary;