import React,{useState, useEffect} from "react";
import './home.css';
import notificationicon from '../images/icons8-notifications-64.png';
import QrcodeImg from '../images/qrcode.png'
import { Link, useNavigate } from "react-router-dom";
import NotificationModal from "../Notifications/NotificationModal";

const DashboardTeam = () => {
    const [notifications, setNotifications] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const nav = useNavigate()

    useEffect(() => {
        fetchNotifications();
    }, []);

    const fetchNotifications = async () => {
        try {
            const response = await fetch('/api/notifications/123'); // Replace 123 with actual user id
            const data = await response.json();
            setNotifications(data);
        } catch (error) {
            console.error('Error fetching notifications:', error);
        }
    };

    const toggleModal = () => {
        setShowModal(!showModal);
    };


    const handleRedirectQrScanner = () => {
        window.location.href = 'https://qrcodescan.in/#google_vignette';
    };
    return (
        <div className="dashboard_team_main_div">
            <div className="dashvoard_team_header">
                <h3>Amute</h3>
                <button className="notification_icon" onClick={handleRedirectQrScanner}><img src={QrcodeImg} alt="QR Scanner" className="notification_dashboard_icon"/></button>
                <button className="notification_icon" onClick={toggleModal}><img src={notificationicon} alt="Notifications" className="notification_dashboard_icon" /></button>
                {showModal && <NotificationModal notifications={notifications} onClose={toggleModal} />}
            </div>
        </div>
    );
}

export default DashboardTeam;