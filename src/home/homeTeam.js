import React,{Fragment, useCallback} from "react";
import './home.css'
import NavBarTeam from "./navbarTeam";
import DashboardTeam from "./dashboardTeam";

const HomeTeam = () => {
  
    return<Fragment><div className="main_div_team_dashboard">
        <div className="Dashboard_area_Team_dashboard">
            <DashboardTeam/>
        </div>
    </div>
    </Fragment>
}

export default HomeTeam;