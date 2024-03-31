import React, { Fragment, useState, useEffect } from "react";
import './manageTeam.css'
import { API_ROUTES } from "../../app-modules/api_routes";
import { Link, useParams } from "react-router-dom";
import backBtnicon from '../../images/icons8-arrow-left.png'
import AdminCategoryTeam from "./AdminCategoryTeam";
import DisplaySpecificTeamMemberComponent from "./DisplaySpecificTeammember";
import axios from "axios";

const TeamPagedetails = () => {
    const [userInfo, setUserInfo] = useState(null);
    const params = useParams()
    const [teamData, setTeamData] = useState(null);
  
    useEffect(() => {
        const fetchData = async () => {
            console.log(params.id)
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
                {userInfo && userInfo.role === 'Leader' ? <AdminCategoryTeam/> : <p></p>}
                <DisplaySpecificTeamMemberComponent/>
            </div>
        </Fragment>
    );
}

export default TeamPagedetails;