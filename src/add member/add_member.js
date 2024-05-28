import React, { useState, useEffect } from "react";
import notificationicon from '../images/icons8-notifications-64.png';
import QrcodeImg from '../images/qrcode.png'
import { Link, useNavigate } from "react-router-dom";
import NotificationModal from "../Notifications/NotificationModal";
import { API_ROUTES } from '../app-modules/api_routes';
import './addMember.css';

const AddMember = () => {
    const [notifications, setNotifications] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [roomType, setRoomType] = useState('3 sharing');
    const [formSubmitted, setFormSubmitted] = useState(false);
    const nav = useNavigate();

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newMember = { name, phoneNumber, roomType };
        
        try {
            const response = await fetch(API_ROUTES.addMember, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newMember),
            });

            if (response.ok) {
                // Handle successful submission
                setFormSubmitted(true);
            } else {
                // Handle error
                console.error('Error adding member:', response.statusText);
            }
        } catch (error) {
            console.error('Error adding member:', error);
        }
    };

    return (
        <div className="dashboard_team_main_div">
            <div className="dashvoard_team_header">
                <h3>Amute</h3>
                <button className="notification_icon" onClick={handleRedirectQrScanner}><img src={QrcodeImg} alt="QR Scanner" className="notification_dashboard_icon" /></button>
                <button className="notification_icon" onClick={toggleModal}><img src={notificationicon} alt="Notifications" className="notification_dashboard_icon" /></button>
                {showModal && <NotificationModal notifications={notifications} onClose={toggleModal} />}
            </div>
            <div className="form_container">
                {formSubmitted ? (
                    <div className="success_message">
                        <h2>Member added successfully!</h2>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit}>
                        <div className="form_group">
                            <label htmlFor="name">Name:</label>
                            <input
                                id="name"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Enter your name"
                                required
                            />
                        </div>
                        <div className="form_group">
                            <label htmlFor="phone">Phone Number:</label>
                            <input
                                id="phone"
                                type="text"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                placeholder="Enter your phone number"
                                required
                            />
                        </div>
                        <div className="form_group">
                            <label htmlFor="roomType">Room Type:</label>
                            <select
                                id="roomType"
                                value={roomType}
                                onChange={(e) => setRoomType(e.target.value)}
                                required
                            >
                                <option value="2 sharing">2 sharing</option>
                                <option value="3 sharing">3 sharing</option>
                                <option value="4 sharing">4 sharing</option>
                            </select>
                        </div>
                        <button type="submit" className="submit_button">Add Member</button>
                    </form>
                )}
            </div>
        </div>
    );
}

export default AddMember;