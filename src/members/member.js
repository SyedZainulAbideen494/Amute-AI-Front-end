import React, { useState, useEffect } from "react";
import notificationicon from '../images/icons8-notifications-64.png';
import QrcodeImg from '../images/qrcode.png';
import { Link, useNavigate } from "react-router-dom";
import NotificationModal from "../Notifications/NotificationModal";
import './member.css'; // Import the CSS file for styling
import { API_ROUTES } from "../app-modules/api_routes";

const Member = () => {
    const [notifications, setNotifications] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [members, setMembers] = useState([]);
    const nav = useNavigate();

    useEffect(() => {
        fetchNotifications();
        fetchMembers();
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

    const fetchMembers = async () => {
        try {
            const response = await fetch(API_ROUTES.displayMember); // Replace with your actual endpoint
            const data = await response.json();
            setMembers(data);
        } catch (error) {
            console.error('Error fetching members:', error);
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
                <button className="notification_icon" onClick={handleRedirectQrScanner}><img src={QrcodeImg} alt="QR Scanner" className="notification_dashboard_icon" /></button>
                <button className="notification_icon" onClick={toggleModal}><img src={notificationicon} alt="Notifications" className="notification_dashboard_icon" /></button>
                {showModal && <NotificationModal notifications={notifications} onClose={toggleModal} />}
            </div>
            <div className="member_list">
                <h3>Member List</h3>
                <ul>
                    {members.map((member, index) => (
                        <li key={index}>
                            <div className="member_card">
                                <p><strong>Name:</strong> {member.name}</p>
                                <p><strong>Phone Number:</strong> {member.phoneNumber}</p>
                                <p><strong>Room Type:</strong> {member.room_type}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Member;