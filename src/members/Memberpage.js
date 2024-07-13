import React,{Fragment, useCallback} from "react";
import NavBarTeam from "./navbarTeam";
import DashboardTeam from "./member";
import Member from "./member";


const MemberPage = () => {
  
    return<Fragment><div className="main_div_team_dashboard">
        <div className="Dashboard_area_Team_dashboard">
            <Member/>
        </div>
    </div>
    </Fragment>
}

export default MemberPage;