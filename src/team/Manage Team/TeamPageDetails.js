import React, { Fragment, useState, useEffect } from "react";
import './manageTeam.css'
import { API_ROUTES } from "../../app-modules/api_routes";
import { Link, useNavigate, useParams } from "react-router-dom";
import backBtnicon from '../../images/icons8-arrow-left.png'
import AdminCategoryTeam from "./AdminCategoryTeam";
import DisplaySpecificTeamMemberComponent from "./DisplaySpecificTeammember";
import axios from "axios";

const TeamPagedetails = () => {
    const [userInfo, setUserInfo] = useState('');
    const params = useParams()
    const [teamData, setTeamData] = useState(null);
    const nav = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${API_ROUTES.displayTeamDetails}/${params.id}`);
                setTeamData(response.data);
            } catch (error) {
                console.error('Error fetching team data: ', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const fetchUserInfo = async () => {
            const token = localStorage.getItem('token');

            if (!token) {
                console.error('Token not found');
                return;
            }

            try {
                const response = await fetch(API_ROUTES.fetchUserDetails, {
                    method: 'GET',
                    headers: {
                        'Authorization': token
                    }
                });

                const data = await response.json();

                if (data.error) {
                    console.error('Error fetching user:', data.error);
                    return;
                }

                setUserInfo(data);
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };

        fetchUserInfo();
    }, []);

    useEffect(() => {
        // Redirect based on user role
        if (userInfo && userInfo.role === 'Member') {
            nav('/team');
        }
    }, [userInfo, nav]);

    // Add a conditional check for teamData before accessing its properties
    if (!teamData) {
        return <p>Loading...</p>;
    }

    return (
        <Fragment>
            <div className="ma_div_team_manage_page">
                <div className="dashboard_team_main_div">
                    <div className="dashvoard_team_header">
                        <Link to='/team'>
                            <button className="setting_btn_dashboard_team"><img src={backBtnicon} alt="Back Button" className="notification_dashboard_icon" /></button>
                        </Link>
                        <h3>{teamData[0]?.name}</h3>
                    </div>
                </div>
                {userInfo && userInfo.role === 'Leader' ? <AdminCategoryTeam /> : null}
                <DisplaySpecificTeamMemberComponent />
            </div>
        </Fragment>
    );
}

export default TeamPagedetails;