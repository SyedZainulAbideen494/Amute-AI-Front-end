import React,{Fragment, useCallback} from "react";
import './home.css'
import NavBarTeam from "./navbarTeam";
import DashboardTeam from "./dashboardTeam";
import RightMenuTeam from "./rightmenuTeam";
import useActivityTracker from '../app-modules/activeStatus'

const HomeTeam = () => {
  
    return<Fragment><div className="main_div_team_dashboard">
        <div className="nav_bar_area_Team_dashboard">
            <NavBarTeam/>
        </div>
        <div className="Dashboard_area_Team_dashboard">
            <DashboardTeam/>
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
            <DashboardTeam/>
        </div>
        <div className="rightmenu_area_Team_dashboard">
            <RightMenuTeam/>
        </div>
    </div>
    </Fragment>
}

export default HomeTeam;