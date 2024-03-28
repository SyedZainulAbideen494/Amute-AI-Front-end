import React,{Fragment, useCallback} from "react";
import './team.css'
import notificationicon from '../images/icons8-notifications-64.png';
import settingsicon from '../images/icons8-settings-50.png'

const Team = () => {
    return<Fragment>
        <div className="dashboard_team_main_div">
            <div className="dashvoard_team_header">
                <h3>Team</h3>
                <button className="setting_btn_dashboard_team"><img src={settingsicon} alt="Settings" className="notification_dashboard_icon" /></button>
                <button className="notification_icon"><img src={notificationicon} alt="Notifications" className="notification_dashboard_icon" /></button>
            </div>
        </div>
    </Fragment>
}

export default Team