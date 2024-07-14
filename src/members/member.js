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
    const [paidRentMembers, setPaidRentMembers] = useState([])

    const handleRemoveMember = (member_id) => {
        axios.delete(`https://71b9585e58c4f527e361885f1b2f25ec.serveo.net/api/vacating-members/${member_id}`)
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
          const response = await axios.get('https://71b9585e58c4f527e361885f1b2f25ec.serveo.net/api/vacating-members');
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
            const response = await fetch('https://71b9585e58c4f527e361885f1b2f25ec.serveo.net/api/total-rent');
            const data = await response.json();
            setTotalRent(data.totalRent);
        } catch (error) {
            console.error('Error fetching total rent:', error);
        }
    };

    const fetchLeavingMembers = async () => {
        try {
            const response = await fetch('https://71b9585e58c4f527e361885f1b2f25ec.serveo.net/api/leaving-members');
            const data = await response.json();
            setLeavingMembers(data);
        } catch (error) {
            console.error('Error fetching leaving members:', error);
        }
    };

    const fetchRentNotPaid = async () => {
        try {
            const response = await fetch('https://71b9585e58c4f527e361885f1b2f25ec.serveo.net/api/rent-not-paid');
            const data = await response.json();
            setRentNotPaid(data);
        } catch (error) {
            console.error('Error fetching rent not paid:', error);
        }
    };

    const fetchJoiningMembers = async () => {
        try {
            const response = await fetch('https://71b9585e58c4f527e361885f1b2f25ec.serveo.net/api/joining-members');
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
          const response = await fetch(`https://71b9585e58c4f527e361885f1b2f25ec.serveo.net/api/mark-rent-paid/${memberId}`, {
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

    const markRentNotPaid = async (memberId) => {
        try {
          const response = await fetch(`https://71b9585e58c4f527e361885f1b2f25ec.serveo.net/api/mark-rent-not-paid/${memberId}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ payment_pending: 1 }) // Assuming 'payment_pending' field in your API
          });
          if (response.ok) {
            // Update UI or fetch updated rent not paid list
            fetchPaidRentMembers();
            console.log(`Rent marked as paid for member ID ${memberId}`);
          } else {
            console.error('Failed to mark rent as paid');
          }
        } catch (error) {
          console.error('Error marking rent as paid:', error);
        }
      };

    const fetchPaidRentMembers = async () => {
        try {
            const response = await fetch('https://71b9585e58c4f527e361885f1b2f25ec.serveo.net/api/members-paid-rent');
            const data = await response.json();
            // Assuming you want to set this data into a state variable
            setPaidRentMembers(data);
        } catch (error) {
            console.error('Error fetching members with paid rent:', error);
        }
    };
    
    // Call fetchPaidRentMembers inside useEffect or as needed
    useEffect(() => {
        fetchPaidRentMembers();
    }, []);

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


    const UpdateMemberModal = ({ member, onUpdateSuccess, onClose }) => {
        const [name, setName] = useState(member ? member.name : '');
        const [phoneNo, setPhoneNo] = useState(member ? member.phoneno : '');
        const [sharing, setSharing] = useState('');
        const [beds, setBeds] = useState([]);
        const [selectedBed, setSelectedBed] = useState(member ? member.bed.id : '');
        const [showModal, setShowModal] = useState(false);
        const [searchTerm, setSearchTerm] = useState('');
        const [filteredBeds, setFilteredBeds] = useState([]);
      
        useEffect(() => {
          if (member) {
            fetchBeds(member.room.sharing);
          }
        }, [member]);
      
        const fetchBeds = async (sharing) => {
          try {
            const response = await axios.get(`https://71b9585e58c4f527e361885f1b2f25ec.serveo.net/beds/${sharing}`);
            setBeds(response.data);
            setSharing(sharing);
          } catch (error) {
            console.error('Error fetching beds:', error);
          }
        };
      
        const updateMember = async () => {
          if (selectedBed) {
            try {
              await axios.put(`${API_ROUTES.editMember}/${member.member_id}`, {
                name,
                phoneNo,
                bedId: selectedBed
              });
              setShowModal(true); // Show modal on successful update
              onUpdateSuccess(); // Trigger parent component update
              setTimeout(() => {
                setShowModal(false);
                onClose(); // Close update modal
              }, 2000); // Close the modal after 2 seconds
            } catch (error) {
              console.error('Error updating member:', error);
            }
          } else {
            alert('Please select a bed.');
          }
        };
      
        const closeModal = () => {
          setShowModal(false);
          onClose();
        };
      
        const filterBeds = (term) => {
          setSearchTerm(term);
          if (term.trim() === '') {
            setFilteredBeds(beds); // If search term is empty, show all beds
          } else {
            const lowercasedFilter = term.toLowerCase();
            const filteredData = beds.filter((bed) =>
              `${bed.buildingName} ${bed.floor_number} ${bed.flat_number} ${bed.room_number} ${bed.bed_number}`
                .toLowerCase()
                .includes(lowercasedFilter)
            );
            setFilteredBeds(filteredData);
          }
        };
      
        return (
            <div className="modal-overlay">
            <div className="modal-content">
              <h1 className="heading_update_member">Update Member</h1>
              <div className="update_member_form">
                <input
                  type="text"
                  className="input-text_update_member"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <input
                  type="text"
                  className="input-text_update_member"
                  placeholder="Phone No"
                  value={phoneNo}
                  onChange={(e) => setPhoneNo(e.target.value)}
                />
                <div className="button-group_update_member">
                  <button className="button_update_member" onClick={() => fetchBeds(1)}>1 Sharing</button>
                  <button className="button_update_member" onClick={() => fetchBeds(2)}>2 Sharing</button>
                  <button className="button_update_member" onClick={() => fetchBeds(3)}>3 Sharing</button>
                  <button className="button_update_member" onClick={() => fetchBeds(4)}>4 Sharing</button>
                </div>
                <div className="search-bar_update_member">
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => filterBeds(e.target.value)}
                    className="input-text_update_member"
                  />
                </div>
                <div className="radio-group_update_member">
                  {(searchTerm ? filteredBeds : beds).map(bed => (
                    <div className="radio-item_update_member" key={bed.bedId}>
                      <input
                        type="radio"
                        className="radio-input_update_member"
                        id={`bed_${bed.bedId}`}
                        name="bed"
                        value={bed.bedId}
                        onChange={() => setSelectedBed(bed.bedId)}
                        checked={selectedBed === bed.bedId}
                      />
                      <label htmlFor={`bed_${bed.bedId}`} className="radio-label_update_member">
                        {`Building: ${bed.buildingName}, Floor: ${bed.floor_number}, Flat: ${bed.flat_number}, Room: ${bed.room_number}, Bed: ${bed.bed_number}`}
                      </label>
                    </div>
                  ))}
                </div>
                <button className="button_update_member" onClick={updateMember} style={{marginRight:'20px'}}>Update Member</button>
                <button className="button_update_member" onClick={toggleModal} style={{marginLeft:'20px'}}>Cancel</button>
              </div>
              {showModal &&  
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
                  <button onClick={toggleModal} className="button_update_member">Close</button>
                </div>
              }
            </div>
          </div>
        );
      }
      

    return (
<div className="dashboard-team-container">
    <nav className="left-navbar">
        <h3>Dashboard</h3>
        <ul>
            <li><Link to="/">Dashboard</Link></li>
            <li><Link to="/members">Members</Link></li>
            <li><Link to="/statements">Statements</Link></li>
            <li><Link to="/add-members">Add Members</Link></li>
        </ul>
    </nav>
    <div>
        <div className="main-dashboard">
        <div className="dashboard-cards">
               
               <div className="dashboard-card">
           <h4>All Members</h4>
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
       <li key={index} className="dashboard-card">
           <p><strong>Name:</strong> {member.name}</p>
           <p><strong>Phone Number:</strong> {member.phoneno}</p>
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
                        <h4>Rent Paid This Month</h4>
                        <ul>
                            {paidRentMembers.map(member => (
                                <li key={member.id} className="member-item">
                                    <span>{member.name} - {member.phoneno}</span>
                                    <button className="view-button" onClick={() => markRentNotPaid(member.member_id)}>Mark Not Paid</button>
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
            <div className="dashboard-card">
                <h4>All Members</h4>
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
            <li key={index} className="dashboard-card">
                <p><strong>Name:</strong> {member.name}</p>
                <p><strong>Phone Number:</strong> {member.phoneno}</p>
                <button className="vacating_btn" onClick={() => viewMemberDetails(member)}>View</button>
                <button onClick={() => handleOpenDeleteModal(member.member_id)} className="vacating_btn">Vacating</button>
                <button onClick={() => handleOpenUpdateModal(member)} className="vacating_btn">Update</button>
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
                        <p><strong>Phone:</strong> {selectedMember.phoneno}</p>
                        <p><strong>Adhar:</strong> {selectedMember.adhar}</p>
                        <p><strong>Alternative Numbers:</strong> {selectedMember.alternative_numbers}</p>
                        <p><strong>Working Location:</strong> {selectedMember.working_location}</p>
                        <p><strong>Date Joined:</strong> {selectedMember.date_join}</p>
                        <p><strong>Date Leaving:</strong> {selectedMember.date_leaving}</p>
                        <p><strong>Costing (Rent):</strong> {selectedMember.costing}</p>
                        <p><strong>Building:</strong> {selectedMember.building.name}</p>
                <p><strong>Floor:</strong> {selectedMember.floor.floor_number}</p>
                <p><strong>Flat:</strong> {selectedMember.flat.flat_number}</p>
                <p><strong>Room:</strong> {selectedMember.room.room_number}</p>
                <p><strong>Sharing:</strong> {selectedMember.room.sharing}</p>
                <p><strong>Bed:</strong> {selectedMember.bed.bed_number}</p>
                        <p><strong>Rent Payment Status:</strong> {selectedMember.payment_pending == '0' ? 'Paid' : 'Not Paid'}</p>
                    </div>
                </div>
            )}
    </div>
</div>
    );
}

export default Member;