import React,{useCallback} from "react";
import './home.css'
import NavBarTeam from "./navbarTeam";

const HomeAdmin = () => {
    return<div className="main_div_admin_dashboard">
        <div className="nav_bar_area_admin_dashboard">
            <NavBarTeam/>
        </div>
    </div>
}

export default HomeAdmin;