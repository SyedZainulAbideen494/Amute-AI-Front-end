import React,{Fragment, useCallback} from "react";
import './task.css'
import notificationicon from '../images/icons8-notifications-64.png';
import settingsicon from '../images/icons8-settings-50.png'
import { Link } from "react-router-dom";

const TaskAssign = () => {
    return<Fragment>
            <div className="main_div_assign_task">
            <div className="dashboard_team_main_div">
            <div className="dashvoard_team_header">
                <h3>Task</h3>
                <Link to='/summary'>
                <button className="mobl_btn_dashboard_btn_summary">Summary</button>
                </Link>
                <button className="setting_btn_dashboard_team"><img src={settingsicon} alt="Settings" className="notification_dashboard_icon" /></button>
                <button className="notification_icon"><img src={notificationicon} alt="Notifications" className="notification_dashboard_icon" /></button>
            </div>
        </div>
            </div>
    </Fragment>
}

export default TaskAssign