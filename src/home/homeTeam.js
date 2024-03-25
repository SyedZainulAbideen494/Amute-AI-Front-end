import React,{useCallback} from "react";
import './home.css'
import NavBarTeam from "./navbarTeam";

const HomeTeam = () => {
    return<div className="main_div_team_dashboard">
        <div className="nav_bar_area_Team_dashboard">
            <NavBarTeam/>
        </div>
    </div>
}

export default HomeTeam;