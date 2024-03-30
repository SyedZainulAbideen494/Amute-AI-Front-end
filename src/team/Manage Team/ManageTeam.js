import React,{Fragment, useState} from "react";
import './manageTeam.css'
import DisplayTeam from "../Main Team Page/displayTeam";
import { API_ROUTES } from "../../app-modules/api_routes";
import NavBarTeam from "../../home/navbarTeam";
import RightMenuSummary from "../../home/rightmenuTeam";
import RightMenuTeam from '../../home/rightmenuTeam'
import Team from "../Main Team Page/Team";
import useActivityTracker from "../../app-modules/activeStatus";
import ManagerTeamDisplay from "./TeamManageDisplay";
import TeamPagedetails from "./TeamPageDetails";


const ManagerTeam = () => {
    return<Fragment>
    <Fragment><div className="main_div_team_dashboard">
    <div className="nav_bar_area_Team_dashboard">
        <NavBarTeam/>
    </div>
    <div className="Dashboard_area_Team_dashboard">
    <TeamPagedetails/>
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
    <TeamPagedetails/>
    </div>
    <div className="rightmenu_area_Team_dashboard">
        <RightMenuTeam/>
    </div>
</div>
</Fragment>
</Fragment>
}

export default ManagerTeam