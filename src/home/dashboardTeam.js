import React from "react";
import './home.css';
import notificationicon from '../images/icons8-notifications-64.png';
import settingsicon from '../images/icons8-settings-50.png'
import { Link } from "react-router-dom";

const DashboardTeam = () => {
    return (
        <div className="dashboard_team_main_div">
            <div className="dashvoard_team_header">
                <h3>Amute</h3>
                <button className="setting_btn_dashboard_team"><img src={settingsicon} alt="Settings" className="notification_dashboard_icon" /></button>
                <button className="notification_icon"><img src={notificationicon} alt="Notifications" className="notification_dashboard_icon" /></button>
            </div>
        </div>
    );
}

export default DashboardTeam;