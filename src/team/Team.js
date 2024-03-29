import React,{Fragment, useCallback, useEffect, useState} from "react";
import './team.css'
import axios from "axios";
import { API_ROUTES } from "../app-modules/api_routes";
import notificationicon from '../images/icons8-notifications-64.png';
import settingsicon from '../images/icons8-settings-50.png'
import DisplayTeam from "./displayTeam";
import DisplayTeamMembers from "./DisplayTeamMembers";

const Team = () => {
 const [userTeams, setUserTeams] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch user's teams
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token not found');
      setIsLoading(false);
      return;
    }

    axios.post(API_ROUTES.getUserTeams, { token })
      .then(response => {
        setUserTeams(response.data.teams);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching user teams:', error);
        setIsLoading(false);
      });
  }, []);
    return<Fragment>
        <div className="dashboard_team_main_div">
            <div className="dashvoard_team_header">
                <h3>Team</h3>
                <button className="setting_btn_dashboard_team"><img src={settingsicon} alt="Settings" className="notification_dashboard_icon" /></button>
                <button className="notification_icon"><img src={notificationicon} alt="Notifications" className="notification_dashboard_icon" /></button>
            </div>
            <DisplayTeamMembers/>
        </div>
    </Fragment>
}

export default Team