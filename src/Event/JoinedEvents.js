import React, { useEffect, useState, Fragment } from 'react';
import QRCode from 'qrcode.react';
import { useParams } from 'react-router-dom';
import './event.css'; // Import your CSS file
import notificationicon from '../images/icons8-notifications-64.png';
import settingsicon from '../images/icons8-settings-50.png'
import NavBarTeam from "../home/navbarTeam";
import DashboardTeam from "../home/dashboardTeam";
import JoinedEventsData from './JoinedEventsData';

const JoinedEvents = () => {
    return<Fragment><div className="main_div_team_dashboard">
    <div className="nav_bar_area_Team_dashboard">
        <NavBarTeam/>
    </div>
    <div className="Dashboard_area_Team_dashboard">
        <DashboardTeam/>
        <JoinedEventsData/>
    </div>
    <div className="rightmenu_area_Team_dashboard">
    </div>
</div>


<div className="main_div_team_dashboard_smallscreen">
<div className="nav_bar_area_Team_dashboard">
        <NavBarTeam/>
    </div>
    <div className="Dashboard_area_Team_dashboard">
        <DashboardTeam/>
        <JoinedEventsData/>
    </div>
    <div className="rightmenu_area_Team_dashboard">
    </div>
</div>
</Fragment>
};

export default JoinedEvents;