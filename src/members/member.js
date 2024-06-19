import React, { useState, useEffect } from "react";
import notificationicon from '../images/icons8-notifications-64.png';
import QrcodeImg from '../images/qrcode.png';
import { useNavigate } from "react-router-dom";
import NotificationModal from "../Notifications/NotificationModal";
import axios from "axios";
import './member.css'; // Import the CSS file for styling
import { API_ROUTES } from "../app-modules/api_routes";

const Member = () => {
    const [notifications, setNotifications] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [members, setMembers] = useState([]);
    const [selectedMemberId, setSelectedMemberId] = useState(null); // To store the selected member id for deletion
    const [selectedMember, setSelectedMember] = useState(null); // To store the selected member for updating
    const nav = useNavigate();
    const [deleteSuccess, setDeleteSuccess] = useState(false);
    const [searchQuery, setSearchQuery] = useState(""); // To store the search query


    const handleDeleteMember = async () => {
        try {
            console.log(`Deactivating member with id: ${selectedMemberId}`);
            const response = await fetch(`${API_ROUTES.deleteMember}/${selectedMemberId}`, {
                method: 'PUT', // or 'PATCH' depending on your API endpoint
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ active: false }) // assuming 'active' is the column to update
            });
    
            if (response.ok) {
                setDeleteSuccess(true); // Set delete success to true
                setMembers(members.filter(member => member.member_id !== selectedMemberId));
                setTimeout(() => {
                    resetDeleteModal();
                }, 2000); // Reset delete modal after 2 seconds
            } else {
                console.error('Failed to deactivate member');
            }
        } catch (error) {
            console.error('Error deactivating member:', error);
        }
    };
    
    const resetDeleteModal = () => {
        setDeleteSuccess(false);
        toggleDeleteModal();
    };
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

    const toggleDeleteModal = () => {
        setShowDeleteModal(!showDeleteModal);
    };

    const handleRedirectQrScanner = () => {
        window.location.href = 'https://qrcodescan.in/#google_vignette';
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const filteredMembers = members.filter(member =>
        member.name.toLowerCase().includes(searchQuery.toLowerCase())
    );


    const handleOpenDeleteModal = (memberId) => {
        setSelectedMemberId(memberId);
        toggleDeleteModal();
    };

    const handleOpenUpdateModal = (member) => {
        setSelectedMember(member);
        toggleModal();
    };

    const UpdateMemberModal = ({ member, updateMemberDetails, toggleModal }) => {
        const [name, setName] = useState(member ? member.name : '');
        const [phoneNumber, setPhoneNumber] = useState(member ? member.phoneno : '');
        const [building, setBuilding] = useState(member ? member.building.name : '');
        const [floor, setFloor] = useState(member ? member.floor.floor_number : '');
        const [flat, setFlat] = useState(member ? member.flat.flat_number : '');
        const [room, setRoom] = useState(member ? member.room.room_number : '');
        const [bed, setBed] = useState(member ? member.bed.bed_number : '');
        const [message, setMessage] = useState(''); // State to manage the feedback message
        const [updateSuccess, setUpdateSuccess] = useState(false); // State to manage update success
    
        const handleUpdate = async (e) => {
            e.preventDefault();
    
            try {
                const response = await axios.put(`${API_ROUTES.editMember}/${member.member_id}`, {
                    name,
                    phoneno: phoneNumber,
                    building,
                    floor,
                    flat,
                    room,
                    bed
                });
    
                if (response.status === 200) {
                    setUpdateSuccess(true);
                    setMessage('Member details updated successfully');
                    updateMemberDetails();
                    setTimeout(() => {
                        toggleModal();
                    }, 2000); // Close the modal after 2 seconds
                } else {
                    setMessage('Failed to update member details');
                }
            } catch (error) {
                console.error('Error updating member:', error.response || error.message || error);
                setMessage('Failed to update member details');
            }
        };
    
        return (
            <div className="modal-overlay">
                <div className="modal-content">
                    {!updateSuccess ? (
                        <form onSubmit={handleUpdate}>
                            <div className="form_group">
                                <label htmlFor="name">Name:</label>
                                <input
                                    id="name"
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Enter name"
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
                                placeholder="Enter phone number"
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
                        <button type="submit" className="vacating_btn">Update</button>
                        <button type="button" onClick={toggleModal} className="vacating_btn">Cancel</button>
                        {message && <p>{message}</p>} {/* Display the message below the buttons */}
                    </form>
                ) : (
                    <div className="success-animation">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="100"
                            height="100"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#00cc00"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <circle cx="12" cy="12" r="10" />
                            <path d="M8 14l4 4 8-8" />
                        </svg>
                        <p>Member Updated Successfully</p>
                        <button onClick={toggleModal}>Close</button>
                    </div>
                )}
            </div>
        </div>
    );
};
    return (
        <div className="dashboard_team_main_div">
            <div className="dashvoard_team_header">
                <h3>Amute</h3>
                <button className="notification_icon" onClick={handleRedirectQrScanner}>
                    <img src={QrcodeImg} alt="QR Scanner" className="notification_dashboard_icon" />
                </button>
                {showDeleteModal && (
    <div className="modal-overlay">
        <div className="modal-content">
            {!deleteSuccess ? (
                <>
                    <h2>Delete Member</h2>
                    <p>Are you sure you want to make this change?</p>
                    <div className="modal-buttons">
                        <button onClick={handleDeleteMember}>Confirm</button>
                        <button onClick={toggleDeleteModal}>Cancel</button>
                    </div>
                </>
            ) : (
                <div className="success-animation">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="100"
                        height="100"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#00cc00"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <circle cx="12" cy="12" r="10" />
                        <path d="M8 14l4 4 8-8" />
                    </svg>
                    <p>Member Deleted Successfully</p>
                    <button onClick={resetDeleteModal}>Close</button>
                </div>
            )}
        </div>
    </div>
)}
           </div>
            <div className="member_list">
                <h3>Member List</h3>
                <div className="member_search_bar">
                    <input
                        type="text"
                        placeholder="Search members by name..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
                </div>
                <ul>
                    {filteredMembers.map((member, index) => (
                        <li key={index}>
                            <div className="member_card">
                                <p><strong>Name:</strong> {member.name}</p>
                                <p><strong>Phone Number:</strong> {member.phoneno}</p>
                                <p><strong>Building:</strong> {member.building.name}</p>
                                <p><strong>Floor:</strong> {member.floor.floor_number}</p>
                                <p><strong>Flat:</strong> {member.flat.flat_number}</p>
                                <p><strong>Room:</strong> {member.room.room_number}</p>
                                <p><strong>Sharing:</strong> {member.room.sharing}</p>
                                <p><strong>Bed:</strong> {member.bed.bed_number}</p>
                                <button onClick={() => handleOpenDeleteModal(member.member_id)} className="vacating_btn">Vacating</button>
                                <button onClick={() => handleOpenUpdateModal(member)} className="vacating_btn">Update</button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            {showModal && (
                <UpdateMemberModal
                    member={selectedMember}
                    updateMemberDetails={fetchMembers}
                    toggleModal={toggleModal}
                />
            )}
        </div>
    );
}

export default Member;