import React, { useState, useEffect } from "react";
import notificationicon from '../images/icons8-notifications-64.png';
import QrcodeImg from '../images/qrcode.png';
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
    const [errorMessage, setErrorMessage] = useState('');
    const [building, setBuilding] = useState('Building 1');
    const [floor, setFloor] = useState('1'); // Changed to match floor_number
    const [flat, setFlat] = useState('1'); // Changed to match flat_number
    const [room, setRoom] = useState('1'); // Changed to match room_number
    const [bed, setBed] = useState('1'); // Changed to match bed_number
    const [submitting, setSubmitting] = useState(false); // State to track form submission

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
        const newMember = { name, phoneNumber, roomType, building, floor, flat, room, bed };

        setSubmitting(true); // Set submitting state to true

        try {
            const response = await fetch(API_ROUTES.addMember, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newMember),
            });

            if (response.ok) {
                setFormSubmitted(true);
                setErrorMessage('');
            } else {
                const errorText = await response.text();
                setErrorMessage(errorText);
            }
        } catch (error) {
            console.error('Error adding member:', error);
            setErrorMessage('An error occurred while adding the member.');
        } finally {
            setSubmitting(false); // Set submitting state back to false
        }
    };

    const handleResetForm = () => {
        setName('');
        setPhoneNumber('');
        setBuilding('Building 1');
        setFloor('1');
        setFlat('1');
        setRoom('1');
        setBed('1');
        setFormSubmitted(false);
        setErrorMessage('');
    };

    return (
        <div className={`dashboard_team_main_div ${submitting ? 'submitting' : ''}`}>
            <div className="dashvoard_team_header">
                <h3>Amute</h3>
                <button className="notification_icon" onClick={handleRedirectQrScanner}><img src={QrcodeImg} alt="QR Scanner" className="notification_dashboard_icon" /></button>
                <button className="notification_icon" onClick={toggleModal}><img src={notificationicon} alt="Notifications" className="notification_dashboard_icon" /></button>
                {showModal && <NotificationModal notifications={notifications} onClose={toggleModal} />}
            </div>
            <div className={`form_container ${formSubmitted ? 'fade-out' : ''}`}>
                {formSubmitted ? (
                    <div className="success_message">
                    <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32">
                        <circle className="checkmark__circle" cx="16" cy="16" r="15" fill="none" strokeWidth="2"/>
                        <path className="checkmark__check" fill="none" strokeWidth="2" d="M9 16.5l5.5 5.5L23 11"/>
                    </svg>
                    <h2>Member added successfully!</h2>
                    <button className="reset_button" onClick={handleResetForm}>Add Another Member</button>
                </div>
                ) : (
                    <form onSubmit={handleSubmit}>
                        {errorMessage && <p className="error_message">{errorMessage}</p>}
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
                            <label htmlFor="building">Building:</label>
                            <select
                                id="building"
                                value={building}
                                onChange={(e) => setBuilding(e.target.value)}
                                required
                            >
                                <option value="Building 1">Building 1</option>
                                <option value="Building 2">Building 2</option>
                                <option value="Building 3">Building 3</option>
                            </select>
                        </div>
                        <div className="form_group">
                            <label htmlFor="floor">Floor:</label>
                            <select
                                id="floor"
                                value={floor}
                                onChange={(e) => setFloor(e.target.value)}
                                required
                            >
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                            </select>
                        </div>
                        <div className="form_group">
                            <label htmlFor="flat">Flat:</label>
                            <select
                                id="flat"
                                value={flat}
                                onChange={(e) => setFlat(e.target.value)}
                                required
                            >
                                <option value="1">1</option>
                                <option value="2">2</option>
                            </select>
                        </div>
                        <div className="form_group">
                            <label htmlFor="room">Room:</label>
                            <select
                                id="room"
                                value={room}
                                onChange={(e) => setRoom(e.target.value)}
                                required
                            >
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                            </select>
                        </div>
                        <div className="form_group">
                            <label htmlFor="bed">Bed:</label>
                            <input
                                id="bed"
                                type="text"
                                value={bed}
                                onChange={(e) => setBed(e.target.value)}
                                placeholder="Enter bed"
                                required
                            />
                        </div>
                        <button type="submit" className="submit_button" disabled={submitting}>
                            {submitting ? (
                                <div className="loading-spinner"></div>
                            ) : (
                                'Add Member'
                            )}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}

export default AddMember;
