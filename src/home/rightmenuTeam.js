import React, { useState, useEffect } from "react";
import './home.css';
import { API_ROUTES } from "../app-modules/api_routes";
import arrowDown from '../images/icons8-arrow-down.png';
import arrowUp from '../images/icons8-arrow-up.png';
import Calander from "./calander";
import backIcon from '../images/icons8-arrow-left.png';
import { Link } from "react-router-dom";
import AmuteAi from "../amute AI/amuteAi";
import CreateCompany from "../company/createCompany";
import JoinedCompanies from "../company/companiesDisplay";

const RightMenuSummary = () => {
    const [userInfo, setUserInfo] = useState([]);
    const [isTeamDetailsOpen, setIsTeamDetailsOpen] = useState(false);
    const [isTaskDetailsOpen, setIsTaskDetailsOpen] = useState(false);
    const [isCompanyDetailsOpen, setIsCompanyDetailsOpen] = useState(false);
    const [isCalendarDetailsOpen, setIsCalendarDetailsOpen] = useState(false);
    const [isMyCompaniesDetailsOpen, setIsMyCompaniesDetailsOpen] = useState(false);
    const [isAmuteOpen, setIsAmuteOpen] = useState(false);
    const [currentDate, setCurrentDate] = useState(new Date());
    const [isCreateCompanyOpen, setIsCreateCompanyOpen] = useState(false); // State for toggling the "Create Company" component
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
    const toggleAmuteAi = () => {
        setIsAmuteOpen(!isAmuteOpen);
    };
    const toggleCompanyDetails = () => {
        setIsCompanyDetailsOpen(!isCompanyDetailsOpen);
    };

    const toggleCreateCompany = () => {
        setIsCreateCompanyOpen(!isCreateCompanyOpen);
      };

    const toggleMyCompanies = () => {
        setIsMyCompaniesDetailsOpen(!isMyCompaniesDetailsOpen);
      };



    return (
        <div className="rightmenu_summary_main_div">
             <div className="right_menu_summary_header">
             <Link to='/dashboard'>
    <img src={backIcon} alt="Back" className="back_button_Right_menu_mobile"/>
    </Link>
    <h2>Summary</h2>
  </div>
            <div className="summary_details">
            <div className="team_details_summary_menu">
                    <div className="team_details_summary_header" onClick={toggleCompanyDetails}>
                        <h3>Company</h3>
                        <img src={isCompanyDetailsOpen ? arrowUp : arrowDown} alt="Toggle Arrow" className="toggle_arrow" />
                    </div>
                    {isCompanyDetailsOpen && (
                    <div className="team_details_summary_content_company_area" style={{ textAlign: 'center' }}>
                        <p> {userInfo.role === 'Leader' ? (
                                 <p>
                                 <div className="team_details_summary_header"onClick={toggleCreateCompany}>
                                 <h3 style={{marginLeft: '10px'}}>Create Company</h3>
                                 <img src={isCreateCompanyOpen ? arrowUp : arrowDown} alt="Toggle Arrow" className="toggle_arrow" />
                             </div>
                             {isCreateCompanyOpen && <CreateCompany />}
                                 </p>
                            ) : (
                                <p>
                                <div className="team_details_summary_header"onClick={toggleCreateCompany}>
                                <h3 style={{marginLeft: '10px'}}>Join Company</h3>
                                <img src={isCreateCompanyOpen ? arrowUp : arrowDown} alt="Toggle Arrow" className="toggle_arrow" />
                            </div>
                                </p>
                            )}</p>
                             <p>
             <div className="team_details_summary_header"onClick={toggleMyCompanies}>
                <h3 style={{marginLeft: '10px'}}>My Companies</h3>
                  <img src={isMyCompaniesDetailsOpen ? arrowUp : arrowDown} alt="Toggle Arrow" className="toggle_arrow" />
             </div>
             {isMyCompaniesDetailsOpen && <JoinedCompanies/>}
            </p>
                    </div>
                )}
            </div>
            
                </div>
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
                <div className="team_details_summary_menu">
                    <div className="team_details_summary_header" onClick={toggleAmuteAi}>
                        <h3>Amute AI</h3>
                        <img src={isAmuteOpen ? arrowUp : arrowDown} alt="Toggle Arrow" className="toggle_arrow" />
                    </div>
                    {isAmuteOpen && (
                       <AmuteAi/>
                    )}
                </div>
            </div>
    );
}

export default RightMenuSummary;