import React,{ useCallback, Fragment} from "react";
import './attendeeEvent.css'
import notificationicon from '../images/icons8-notifications-64.png';
import settingsicon from '../images/icons8-settings-50.png'
import NavBarTeam from "../home/navbarTeam";
import DashboardTeam from "../home/dashboardTeam";
import AttendeeEventData from "./AttendeeEventdata";

const AttendeeEventJoin = () => {
    return<Fragment><div className="main_div_team_dashboard">
    <div className="nav_bar_area_Team_dashboard">
        <NavBarTeam/>
    </div>
    <div className="Dashboard_area_Team_dashboard">
        <DashboardTeam/>
        <AttendeeEventData/>
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
        <AttendeeEventData/>
    </div>
    <div className="rightmenu_area_Team_dashboard">
    </div>
</div>
</Fragment>
}

export default AttendeeEventJoin