import React from "react";
import './home.css';
import notificationicon from '../images/icons8-notifications-64.png';
import QrcodeImg from '../images/qrcode.png'
import { Link, useNavigate } from "react-router-dom";

const DashboardTeam = () => {
    const nav = useNavigate()

    const handleRedirectQrScanner = () => {
        nav('/https://qrcodescan.in/#google_vignette')
    }

    return (
        <div className="dashboard_team_main_div">
            <div className="dashvoard_team_header">
                <h3>Amute</h3>
                <button className="notification_icon" onClick={handleRedirectQrScanner}><img src={QrcodeImg} alt="QR Scanner" className="notification_dashboard_icon"/></button>
                <button className="notification_icon"><img src={notificationicon} alt="Notifications" className="notification_dashboard_icon" /></button>
            </div>
        </div>
    );
}

export default DashboardTeam;