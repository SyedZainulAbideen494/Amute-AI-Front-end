import React, { useState, useEffect } from "react";
import './home.css';
import { API_ROUTES } from "../app-modules/api_routes";
import arrowDown from '../images/icons8-arrow-down.png';
import arrowUp from '../images/icons8-arrow-up.png';
import Calander from "./calander";

const RightMenuSummary = () => {
    const [userInfo, setUserInfo] = useState([]);
    const [isTeamDetailsOpen, setIsTeamDetailsOpen] = useState(false);
    const [isTaskDetailsOpen, setIsTaskDetailsOpen] = useState(false);
    const [isCalendarDetailsOpen, setIsCalendarDetailsOpen] = useState(true);
    const [currentDate, setCurrentDate] = useState(new Date());

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

    const toggleTeamDetails = () => {
        setIsTeamDetailsOpen(!isTeamDetailsOpen);
    };

    const toggleTaskDetails = () => {
        setIsTaskDetailsOpen(!isTaskDetailsOpen);
    };

    const toggleCalendarDetails = () => {
        setIsCalendarDetailsOpen(!isCalendarDetailsOpen);
    };

    const daysInMonth = () => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth() + 1;
        return new Date(year, month, 0).getDate();
    };

    const renderCalendarDays = () => {
        const totalDays = daysInMonth();
        const calendarDays = [];
        for (let i = 1; i <= totalDays; i++) {
            calendarDays.push(
                <div className={`calendar-day ${i === currentDate.getDate() ? 'live-date' : ''}`} key={i}>
                    {i}
                </div>
            );
        }
        return calendarDays;
    };

    const monthNames = [
        "January", "February", "March", "April", "May", "June", "July",
        "August", "September", "October", "November", "December"
    ];

    return (
        <div className="rightmenu_summary_main_div">
            <div className="right_menu_summary_header">
                <h2>Summary</h2>
            </div>
            <div className="summary_details">
                <div className="team_details_summary_menu">
                    <div className="team_details_summary_header" onClick={toggleTeamDetails}>
                        <h3>Team</h3>
                        <img src={isTeamDetailsOpen ? arrowUp : arrowDown} alt="Toggle Arrow" className="toggle_arrow" />
                    </div>
                    {isTeamDetailsOpen && (
                        <div className="team_details_summary_content">
                            <p> {userInfo.role === 'Leader' ? (
                                <button className="right_menu_btn">
                                    Create Team
                                </button>
                            ) : (
                                <button className="right_menu_btn">
                                    Join Team
                                </button>
                            )}</p>
                        </div>
                    )}
                </div>
                <div className="team_details_summary_menu">
                    <div className="team_details_summary_header" onClick={toggleTaskDetails}>
                        <h3>Tasks</h3>
                        <img src={isTaskDetailsOpen ? arrowUp : arrowDown} alt="Toggle Arrow" className="toggle_arrow" />
                    </div>
                    {isTaskDetailsOpen && (
                        <div className="team_details_summary_content">
                            <p> {userInfo.role === 'Leader' ? (
                                <button className="right_menu_btn">
                                    Assign Tasks
                                </button>
                            ) : (
                                <button className="right_menu_btn">
                                    My Tasks
                                </button>
                            )}</p>
                        </div>
                    )}
                </div>
                <div className="team_details_summary_menu">
                    <div className="team_details_summary_header" onClick={toggleCalendarDetails}>
                        <h3>Schedule</h3>
                        <img src={isCalendarDetailsOpen ? arrowUp : arrowDown} alt="Toggle Arrow" className="toggle_arrow" />
                    </div>
                    {isCalendarDetailsOpen && (
                       <Calander/>
                    )}
                </div>
            </div>
        </div>
    );
}

export default RightMenuSummary;