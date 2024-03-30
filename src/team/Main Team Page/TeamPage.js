import React,{Fragment, useEffect, useState} from "react";
import './team.css'
import { API_ROUTES } from "../../app-modules/api_routes";
import NavBarTeam from "../../home/navbarTeam";
import RightMenuSummary from "../../home/rightmenuTeam";
import RightMenuTeam from '../../home/rightmenuTeam'
import Team from "./Team";
import useActivityTracker from "../../app-modules/activeStatus";
import ManagerTeam from "../Manage Team/ManageTeam";
import ManagerTeamDisplay from "../Manage Team/TeamManageDisplay";

const TeamPage = () => {
    const [userInfo, setUserInfo] = useState(null);

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
        <Fragment><div className="main_div_team_dashboard">
        <div className="nav_bar_area_Team_dashboard">
            <NavBarTeam/>
        </div>
        <div className="Dashboard_area_Team_dashboard">
       
        <Team/>
        {userInfo && userInfo.role === 'Leader' ? <ManagerTeamDisplay/> : <h1>You are a member</h1>}
        </div>
        <div className="rightmenu_area_Team_dashboard">
            <RightMenuTeam/>
        </div>
    </div>


    <div className="main_div_team_dashboard_smallscreen">
    <div className="nav_bar_area_Team_dashboard">
            <NavBarTeam/>
        </div>
        <div className="Dashboard_area_Team_dashboard">
        <Team/>
        {userInfo && userInfo.role === 'Leader' ? <ManagerTeamDisplay/> : <h1>You are a member</h1>}
        </div>
        <div className="rightmenu_area_Team_dashboard">
            <RightMenuTeam/>
        </div>
    </div>
    </Fragment>
    </Fragment>
}

export default TeamPage