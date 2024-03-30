import React,{Fragment, useCallback, useState, useEffect} from "react";
import './manageTeam.css'
import { API_ROUTES } from "../../app-modules/api_routes";
import { Link, useParams } from "react-router-dom";
import backBtnicon from '../../images/icons8-arrow-left.png'
import AdminCategoryTeam from "./AdminCategoryTeam";

const TeamPagedetails = () => {
    const [userInfo, setUserInfo] = useState(null);
    const params = useParams()
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
    return<Fragment>
        <div className="ma_div_team_manage_page">
 <div className="dashboard_team_main_div">
            <div className="dashvoard_team_header">
                <Link to='/team'>
            <button className="setting_btn_dashboard_team"><img src={backBtnicon} alt="Back Button" className="notification_dashboard_icon" /></button>
            </Link>
                <h3>Team</h3>
            </div>
        </div>
    <AdminCategoryTeam/>
    </div>
    </Fragment>
}

export default TeamPagedetails