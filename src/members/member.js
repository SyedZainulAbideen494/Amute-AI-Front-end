import React, { useState, useEffect } from "react";
import notificationicon from '../images/icons8-notifications-64.png';
import QrcodeImg from '../images/qrcode.png';
import { useNavigate, Link } from "react-router-dom";
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
    const [totalMembers, setTotalMembers] = useState(0);
    const [totalRent, setTotalRent] = useState(0);
    const [leavingMembers, setLeavingMembers] = useState([]);
    const [rentNotPaid, setRentNotPaid] = useState([]);
    const [joiningMembers, setJoiningMembers] = useState([]);
    const [showModal_view, setShowModal_view] = useState(false);
    const [deleteDate, setDeleteDate] = useState("");
    const [membersVacateNotice, setMembersVacateNotice] = useState([]);


    const handleRemoveMember = (member_id) => {
        axios.delete(`http://localhost:8080/api/vacating-members/${member_id}`)
            .then(response => {
                // Remove the member from the vacating list in state
                setMembersVacateNotice(prevMembers => (
                    prevMembers.filter(member => member.member_id !== member_id)
                ));
            })
            .catch(error => {
                console.error('Error removing vacating member:', error);
            });
    };


    useEffect(() => {
      const fetchVacatingMembers = async () => {
        try {
          const response = await axios.get('http://localhost:8080/api/vacating-members');
          setMembersVacateNotice(response.data);
        } catch (error) {
          console.error('Error fetching vacating members:', error);
        }
      };
  
      fetchVacatingMembers();
    }, []);

    useEffect(() => {
        fetchMembers();
        fetchTotalRent();
        fetchLeavingMembers();
        fetchRentNotPaid();
        fetchJoiningMembers();
    }, []);


    const fetchTotalRent = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/total-rent');
            const data = await response.json();
            setTotalRent(data.totalRent);
        } catch (error) {
            console.error('Error fetching total rent:', error);
        }
    };

    const fetchLeavingMembers = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/leaving-members');
            const data = await response.json();
            setLeavingMembers(data);
        } catch (error) {
            console.error('Error fetching leaving members:', error);
        }
    };

    const fetchRentNotPaid = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/rent-not-paid');
            const data = await response.json();
            setRentNotPaid(data);
        } catch (error) {
            console.error('Error fetching rent not paid:', error);
        }
    };

    const fetchJoiningMembers = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/joining-members');
            const data = await response.json();
            setJoiningMembers(data);
        } catch (error) {
            console.error('Error fetching joining members:', error);
        }
    };

    const toggleModal_view = () => {
        setShowModal_view(!showModal_view);
    };

    const viewMemberDetails = (member) => {
        setSelectedMember(member);
        toggleModal_view();
    };

    const markRentPaid = async (memberId) => {
        try {
          const response = await fetch(`http://localhost:8080/api/mark-rent-paid/${memberId}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ payment_pending: 0 }) // Assuming 'payment_pending' field in your API
          });
          if (response.ok) {
            // Update UI or fetch updated rent not paid list
            fetchRentNotPaid();
            console.log(`Rent marked as paid for member ID ${memberId}`);
          } else {
            console.error('Failed to mark rent as paid');
          }
        } catch (error) {
          console.error('Error marking rent as paid:', error);
        }
      };

      const handleDeleteMember = async () => {
        try {
          console.log(`Deactivating member with id: ${selectedMemberId} on ${deleteDate}`);
      
          const response = await axios.post(`${API_ROUTES.deleteMember}/${selectedMemberId}`, {
            active: false,
            deletionDate: deleteDate // Include deletion date in the request body
          }, {
            headers: {
              'Content-Type': 'application/json'
            }
          });
      
          if (response.status === 200) {
            setDeleteSuccess(true); // Set delete success to true
            setMembers(members.filter(member => member.member_id !== selectedMemberId));
            setTimeout(() => {
              resetDeleteModal();
            }, 2000); // Reset delete modal after 2 seconds
          } else {
            console.error('Failed to deactivate member');
            alert('Failed to deactivate member');
          }
        } catch (error) {
          console.error('Error deactivating member:', error);
          if (error.response && error.response.status === 409) {
            alert('Duplicate entry found'); // Show alert for duplicate entry
          } else {
            alert('Error deactivating member');
          }
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
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
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
<div className="dashboard-team-container">
    <nav className="left-navbar">
        <h3>Dashboard</h3>
        <ul>
            <li><Link to="/">Dashboard</Link></li>
            <li><Link to="/members">Members</Link></li>
            <li><Link to="/buildings">Buildings</Link></li>
            <li><Link to="/vacating">Vacating</Link></li>
            <li><Link to="/add-members">Add Members</Link></li>
            <li><Link to="/bookings">Bookings</Link></li>
        </ul>
    </nav>
    <div>
        <div className="main-dashboard">
    <div className="dashboard-cards">
<div className="dashboard-card">
    <h3>Member List</h3>
    <ul>
    <div className="member_search_bar">
        <input
            type="text"
            placeholder="Search members by name..."
            value={searchQuery}
            onChange={handleSearchChange}
        />
    </div>
        {filteredMembers.map((member, index) => (
            <li key={index} className="dashboard-card">
                <p><strong>Name:</strong> {member.name}</p>
                <p><strong>Phone Number:</strong> {member.phoneno}</p>
                <p><strong>Building:</strong> {member.building.name}</p>
                <p><strong>Floor:</strong> {member.floor.floor_number}</p>
                <p><strong>Flat:</strong> {member.flat.flat_number}</p>
                <p><strong>Room:</strong> {member.room.room_number}</p>
                <p><strong>Sharing:</strong> {member.room.sharing}</p>
                <p><strong>Bed:</strong> {member.bed.bed_number}</p>
                <button className="vacating_btn" onClick={() => viewMemberDetails(member)}>View</button>
                <button onClick={() => handleOpenDeleteModal(member.member_id)} className="vacating_btn">Vacating</button>
                <button onClick={() => handleOpenUpdateModal(member)} className="vacating_btn">Update</button>
            </li>
        ))}
        </ul>
</div>
</div>
<div className="dashboard-cards">
                    <div className="dashboard-card">
                        <h4>Members Leaving This Month</h4>
                        <ul>
                            {leavingMembers.map(member => (
                                <li key={member.id} className="member-item">
                                    <span>{member.name} - {member.phone}</span>
                                    <button className="view-button" onClick={() => viewMemberDetails(member)}>View</button>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="dashboard-card">
                        <h4>Rent Not Paid This Month</h4>
                        <ul>
                            {rentNotPaid.map(member => (
                                <li key={member.id} className="member-item">
                                    <span>{member.name} - {member.phone}</span>
                                    <button className="view-button" onClick={() => markRentPaid(member.member_id)}>Mark Paid</button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="dashboard-cards">
                    <div className="dashboard-card">
                        <h4>Upcoming Joining Members</h4>
                        <ul>
                            {joiningMembers.map(member => (
                                <li key={member.id} className="member-item">
                                    <span>{member.name} - {member.phone}</span>
                                    <button className="view-button" onClick={() => viewMemberDetails(member)}>View</button>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="dashboard-card">
                        <h4>All Members</h4>
                        <ul>
                            {members.map(member => (
                                <li key={member.id} className="member-item">
                                    <span>{member.name} - {member.phone}</span>
                                    <button className="view-button" onClick={() => viewMemberDetails(member)}>View</button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="dashboard-cards">
                <div className="dashboard-card">
                <h4>On Notice Members</h4>
                <ul>
                    {membersVacateNotice.map(member => (
                        <li key={member.member_id} className="member-item">
                            <span>{member.name} - Vacating Date: {formatDate(member.date_vacating)}</span>
                            <button className="view-button" onClick={() => handleRemoveMember(member.member_id)}>Revert</button>
                        </li>
                    ))}
                </ul>
            </div>
                </div>
</div>
        {showModal && (
            <UpdateMemberModal
                member={selectedMember}
                updateMemberDetails={fetchMembers}
                toggleModal={toggleModal}
            />
        )}
      {showDeleteModal && (
    <div className="modal-overlay">
        <div className="modal-content">
            {!deleteSuccess ? (
                <>
                   <h2 className="delete-member-title">Delete Member</h2>
<p className="delete-member-message">Are you sure you want to make this change?</p>
<div className="modal-input delete-member-input">
    <label htmlFor="deleteDate" className="delete-member-label">Deletion Date:</label>
    <input
        id="deleteDate"
        type="date"
        onChange={(e) => setDeleteDate(e.target.value)}
        value={deleteDate}
        required
        className="delete-member-date-input"
    />
</div>
<div className="modal-buttons delete-member-buttons">
    <button onClick={handleDeleteMember} className="delete-member-confirm-button">Confirm</button>
    <button onClick={toggleDeleteModal} className="delete-member-cancel-button">Cancel</button>
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
        {showModal_view && selectedMember && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={toggleModal_view}>&times;</span>
                        <h2>Member Details</h2>
                        <p><strong>Name:</strong> {selectedMember.name}</p>
                        <p><strong>Phone:</strong> {selectedMember.phone}</p>
                        <p><strong>Adhar:</strong> {selectedMember.adhar}</p>
                        <p><strong>Alternative Numbers:</strong> {selectedMember.alternative_numbers}</p>
                        <p><strong>Working Location:</strong> {selectedMember.working_location}</p>
                        <p><strong>Date Joined:</strong> {selectedMember.date_join}</p>
                        <p><strong>Date Leaving:</strong> {selectedMember.date_leaving}</p>
                        <p><strong>Costing (Rent):</strong> {selectedMember.costing}</p>
                        <p><strong>Rent Payment Status:</strong> {selectedMember.payment_pending == '0' ? 'Paid' : 'Not Paid'}</p>
                    </div>
                </div>
            )}
    </div>
</div>
    );
}

export default Member;