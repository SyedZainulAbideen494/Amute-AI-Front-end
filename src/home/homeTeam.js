import React,{useCallback, useState} from "react";
import './home.css'
import NavBarTeam from "./navbarTeam";
import DashboardTeam from "./dashboardTeam";
import RightMenuTeam from "./rightmenuTeam";

const HomeTeam = () => {
    const [showNav, setShowNav] = useState(false); // State to toggle navigation bar

    // Function to toggle navigation menu
    const toggleNav = () => {
        setShowNav(!showNav);
    };
    return<div className="main_div_team_dashboard">
        <div className="nav_bar_area_Team_dashboard">
        <div className="menu-toggle" onClick={toggleNav}>
                <div className="line"></div>
                <div className="line"></div>
                <div className="line"></div>
            </div>
            {/* Render navigation bar if toggled or on larger screens */}
            {(showNav || window.innerWidth > 768) && (
                <div className="nav_bar_area_Team_dashboard">
                    <NavBarTeam showNav={showNav} toggleNav={toggleNav} />
                </div>
            )}
        </div>
        <div className="Dashboard_area_Team_dashboard">
            <DashboardTeam/>
        </div>
        <div className="rightmenu_area_Team_dashboard">
            <RightMenuTeam/>
        </div>
    </div>
}

export default HomeTeam;