import React,{Fragment, useCallback} from "react";
import NavBarTeam from "./navbarTeam";
import DashboardTeam from "./add_member";
import AddMember from "./add_member";


const AddMemberPage = () => {
  
    return<Fragment>
        <div className="main_div_team_dashboard">
        <div className="Dashboard_area_Team_dashboard">
            <AddMember/>
        </div>
    </div>
    </Fragment>
}

export default AddMemberPage;