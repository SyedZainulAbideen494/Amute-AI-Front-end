import React, { useState, useEffect } from "react";
import './home.css'; // Ensure your CSS file is correctly imported
import { Link } from "react-router-dom";
import { API_ROUTES } from "../app-modules/api_routes";
import axios from "axios";
import SuccessModal from "../members/successModal";
import CalendarComponent from "./calander";

const DashboardTeam = () => {
    const [members, setMembers] = useState([]);
    const [totalMembers, setTotalMembers] = useState(0);
    const [totalRent, setTotalRent] = useState(0);
    const [leavingMembers, setLeavingMembers] = useState([]);
    const [rentNotPaid, setRentNotPaid] = useState([]);
    const [joiningMembers, setJoiningMembers] = useState([]);
    const [selectedMember, setSelectedMember] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [paidRentMembers, setPaidRentMembers] = useState([])
    const [membersVacateNotice, setMembersVacateNotice] = useState([]);
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');

    const renderCalendar = () => {
        const months = [
          'January', 'February', 'March', 'April', 'May', 'June',
          'July', 'August', 'September', 'October', 'November', 'December'
        ];
      
        return (
          <div className="calendar-container">
            <h3>Calendar {new Date().getFullYear()}</h3>
            <div className="calendar">
              {months.map((month, index) => (
                <div
                  key={index}
                  className={`month ${index === currentMonth ? 'current' : ''}`}
                  onClick={() => setCurrentMonth(index)}
                >
                  {month}
                </div>
              ))}
            </div>
          </div>
        );
      };

        const fetchVacatingMembers = async () => {
            try {
              const response = await axios.get(API_ROUTES.fetchVeacatingMemberList);
              setMembersVacateNotice(response.data);
            } catch (error) {
              console.error('Error fetching vacating members:', error);
            }
          };
        
          useEffect(() => {
            fetchVacatingMembers();
          }, []); // Empty dependency array means this effect runs only once on mount
    useEffect(() => {
        fetchMembers();
        fetchTotalRent();
        fetchLeavingMembers();
        fetchRentNotPaid();
        fetchJoiningMembers();
    }, []);

    const fetchMembers = async () => {
        try {
            const response = await fetch(API_ROUTES.displayMember);
            const data = await response.json();
            setMembers(data);
            setTotalMembers(data.length);
        } catch (error) {
            console.error('Error fetching members:', error);
        }
    };

    const fetchTotalRent = async () => {
        try {
            const response = await fetch(API_ROUTES.displayFetchTotalRent);
            const data = await response.json();
            setTotalRent(data.totalRent);
        } catch (error) {
            console.error('Error fetching total rent:', error);
        }
    };

    const fetchLeavingMembers = async () => {
        try {
            const response = await fetch(API_ROUTES.fetchLevingMemberList);
            const data = await response.json();
            setLeavingMembers(data);
        } catch (error) {
            console.error('Error fetching leaving members:', error);
        }
    };

    const fetchRentNotPaid = async () => {
        try {
            const response = await fetch(API_ROUTES.fetchMemberNotPaidRentList);
            const data = await response.json();
            setRentNotPaid(data);
        } catch (error) {
            console.error('Error fetching rent not paid:', error);
        }
    };

    const fetchJoiningMembers = async () => {
        try {
            const response = await fetch(API_ROUTES.fetchJoiningMembersList);
            const data = await response.json();
            setJoiningMembers(data);
        } catch (error) {
            console.error('Error fetching joining members:', error);
        }
    };

    const toggleModal = () => {
        setShowModal(!showModal);
    };

    const viewMemberDetails = (member) => {
        setSelectedMember(member);
        toggleModal();
    };

    const markRentPaid = async (memberId) => {
        try {
            const response = await fetch(`${API_ROUTES.markRentPaidAPI}/${memberId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ payment_pending: 0 })
            });
            if (response.ok) {
                fetchRentNotPaid();
                fetchPaidRentMembers()
                setModalMessage(`Rent marked as paid for member`);
                setShowSuccessModal(true);
            } else {
                console.error('Failed to mark rent as paid');
            }
        } catch (error) {
            console.error('Error marking rent as paid:', error);
        }
    };
    
    const markRentNotPaid = async (memberId) => {
        try {
            const response = await fetch(`${API_ROUTES.markRentNotPaidAPI}/${memberId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ payment_pending: 1 })
            });
            if (response.ok) {
                fetchPaidRentMembers();
                fetchRentNotPaid()
                setModalMessage(`Rent marked as unpaid for member`);
                setShowSuccessModal(true);
            } else {
                console.error('Failed to mark rent as unpaid');
            }
        } catch (error) {
            console.error('Error marking rent as unpaid:', error);
        }
    };
      const fetchPaidRentMembers = async () => {
        try {
            const response = await fetch(API_ROUTES.fetchListMemberRentPaid);
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

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div className="dashboard-team-container">
             {showSuccessModal && (
            <SuccessModal
                message={modalMessage}
                onClose={() => setShowSuccessModal(false)}
            />
        )}
            <nav className="left-navbar">
                <h3>Dashboard</h3>
                <ul>
                <li><Link to="/">Dashboard</Link></li>
            <li><Link to="/members">Members</Link></li>
            <li><Link to="/statements">Statements</Link></li>
            <li><Link to="/add-members">Add Members</Link></li>
            <li>
            <Link to="/building/add">Add Building</Link>
          </li>
                </ul>
            </nav>
            <div className="main-dashboard">
                <div className="dashboard-summary">
                    <div className="summary-box">
                        <h4>Total Members</h4>
                        <p>{totalMembers}</p>
                    </div>
                    <div className="summary-box">
                        <h4>Total Rent This Month</h4>
                        <p>{totalRent}</p>
                    </div>
                    <div className="summary-box">
                        <h4>Members Leaving This Month</h4>
                        <p>{leavingMembers.length}</p>
                    </div>
                </div>
                <CalendarComponent/>
                <div className="dashboard-cards">
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
                                    <span>{member.name} - {member.phoneno}</span>
                                    <button className="view-button" onClick={() => viewMemberDetails(member)}>View</button>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="dashboard-card">
                        <h4>Members Leaving This Month</h4>
                        <ul>
                            {leavingMembers.map(member => (
                                <li key={member.id} className="member-item">
                                    <span>{member.name} - {member.phoneno}</span>
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
                <li key={member.id} className="member-item">
                    <span>{member.name} - Vacating Date: {formatDate(member.date_vacating)}</span>
                </li>
            ))}
                        </ul>
                    </div>
                    <div className="dashboard-card">
                        <h4>All Members</h4>
                        <ul>
                            {members.map(member => (
                                <li key={member.id} className="member-item">
                                    <span>{member.name} - {member.phoneno}</span>
                                    <button className="view-button" onClick={() => viewMemberDetails(member)}>View</button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
            {showModal && selectedMember && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={toggleModal}>&times;</span>
                        <h2>Member Details</h2>
                        <p><strong>Name:</strong> {selectedMember.name}</p>
                        <p><strong>Phone:</strong> {selectedMember.phoneno}</p>
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
    );
}

export default DashboardTeam;