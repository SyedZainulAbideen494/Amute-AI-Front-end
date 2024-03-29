import React,{Fragment, useEffect} from "react";
import './team.css'
import NavBarTeam from "../home/navbarTeam";
import RightMenuSummary from "../home/rightmenuTeam";
import RightMenuTeam from '../home/rightmenuTeam'
import Team from "./Team";
import useActivityTracker from "../app-modules/activeStatus";

const TeamPage = () => {
    const isActive = useActivityTracker();
    return<Fragment>
        <Fragment><div className="main_div_team_dashboard">
        <div className="nav_bar_area_Team_dashboard">
            <NavBarTeam/>
        </div>
        <div className="Dashboard_area_Team_dashboard">
        <Team/>
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
        </div>
        <div className="rightmenu_area_Team_dashboard">
            <RightMenuTeam/>
        </div>
    </div>
    </Fragment>
    </Fragment>
}

export default TeamPage