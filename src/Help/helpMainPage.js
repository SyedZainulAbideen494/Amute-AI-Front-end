import React,{Fragment, useCallback} from "react";
import './help.css'
import NavBarTeam from "../home/navbarTeam";
import DashboardTeam from "../home/dashboardTeam";
import HelpMainPageData from "./helpMainPageData";

const HelpHome = () => {
  
    return<Fragment><div className="main_div_team_dashboard">
        <div className="nav_bar_area_Team_dashboard">
            <NavBarTeam/>
        </div>
        <div className="Dashboard_area_Team_dashboard">
            <DashboardTeam/>
            <HelpMainPageData/>
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
        </div>
        <div className="rightmenu_area_Team_dashboard">
        </div>
    </div>
    </Fragment>
}

export default HelpHome;