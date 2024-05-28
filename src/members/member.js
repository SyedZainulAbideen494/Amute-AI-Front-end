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
    const [selectedMemberId, setSelectedMemberId] = useState(null); // To store the selected member id for deletion
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

    const handleDeleteMember = async () => {
        try {
            // Update the member's status to deactivated in the database
            console.log(`Deactivating member with id: ${selectedMemberId}`);
            const response = await fetch(`http://localhost:8080/api/updateMember/${selectedMemberId}`, {
                method: 'PUT', // or 'PATCH' depending on your API endpoint
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ active: false }) // assuming 'active' is the column to update
            });
    
            // Assuming successful deactivation, update the member's status in state
            setMembers(members.map(member => {
                if (member.member_id === selectedMemberId) {
                    return { ...member, active: false }; // Update the 'active' status
                }
                return member;
            }));
        } catch (error) {
            console.error('Error deactivating member:', error);
        } finally {
            toggleModal(); // Close the modal
        }
    };

    const handleOpenDeleteModal = (memberId) => {
        setSelectedMemberId(memberId);
        toggleModal();
    };

    console.log('showModal:', showModal); // Log the value of showModal to check if it's being updated correctly

    return (
        <div className="dashboard_team_main_div">
            <div className="dashvoard_team_header">
                <h3>Amute</h3>
                <button className="notification_icon" onClick={handleRedirectQrScanner}><img src={QrcodeImg} alt="QR Scanner" className="notification_dashboard_icon" /></button>
                <button className="notification_icon" onClick={toggleModal}><img src={notificationicon} alt="Notifications" className="notification_dashboard_icon" /></button>
                {showModal && (
                    <div className="modal-overlay">
                        <div className="modal-content">
                            <h2>Delete Member</h2>
                            <p>Are you sure you want to make this change?</p>
                            <div className="modal-buttons">
                                <button onClick={handleDeleteMember}>Confirm</button>
                                <button onClick={toggleModal}>Cancel</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <div className="member_list">
                <h3>Member List</h3>
                <ul>
                    {members.map((member, index) => (
                        <li key={index}>
                            <div className="member_card">
                                <p><strong>Name:</strong> {member.name}</p>
                                <p><strong>Phone Number:</strong> {member.phoneno}</p>
                                <p><strong>Room Type:</strong> {member.room_type}</p>
                                <button onClick={() => handleOpenDeleteModal(member.member_id)} className="vacating_btn">Vacating</button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Member;