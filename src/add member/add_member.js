import React, { useState } from "react";
import axios from "axios";
import './addMember.css'; // Ensure your CSS file is named correctly
import SuccessModal from './succesModal';
import { API_ROUTES } from "../app-modules/api_routes";
import { Link } from "react-router-dom";

const AddMember = () => {
  const [name, setName] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [dateJoining, setDateJoining] = useState('');
  const [dateLeaving, setDateLeaving] = useState('');
  const [workingLocation, setWorkingLocation] = useState('');
  const [adharNumber, setAdharNumber] = useState('');
  const [costing, setCosting] = useState('');
  const [alternativeNumber, setAlternativeNumber] = useState('');
  const [sharing, setSharing] = useState('');
  const [beds, setBeds] = useState([]);
  const [selectedBed, setSelectedBed] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredBeds, setFilteredBeds] = useState([]);

  const fetchBeds = async (sharing) => {
    try {
      const response = await axios.get(`${API_ROUTES.fetchBeds}/${sharing}`);
      setBeds(response.data);
      setSharing(sharing);
    } catch (error) {
      console.error('Error fetching beds:', error);
    }
  };

  const addMember = async () => {
    console.log('Form Data:', {
      name,
      phoneNo,
      dateJoining,
      dateLeaving,
      workingLocation,
      adharNumber,
      costing,
      alternativeNumber,
      bedId: selectedBed
    });
  
    if (selectedBed) {
      try {
        await axios.post(API_ROUTES.addMember, {
          name,
          phoneNo,
          dateJoining,
          dateLeaving,
          workingLocation,
          adharNumber,
          costing,
          alternativeNumber,
          bedId: selectedBed
        });
        setShowModal(true); // Show modal on successful addition
        // Reset form fields after successful addition
        setName('');
        setPhoneNo('');
        setDateJoining('');
        setDateLeaving('');
        setWorkingLocation('');
        setAdharNumber('');
        setCosting('');
        setAlternativeNumber('');
        setSelectedBed(null);
      } catch (error) {
        console.error('Error adding member:', error);
      }
    } else {
      alert('Please select a bed.');
    }
  };

  const closeModal = () => {
    setShowModal(false);
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

  return  (
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
      <h1 className="heading_add_member">Add Member</h1>
      <div className="add_member_form">
        <input
          type="text"
          className="input-text_add_member"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          className="input-text_add_member"
          placeholder="Phone No"
          value={phoneNo}
          onChange={(e) => setPhoneNo(e.target.value)}
        />
        <input
          type="date"
          className="input-text_add_member"
          placeholder="Date of Joining"
          value={dateJoining}
          onChange={(e) => setDateJoining(e.target.value)}
        />
        <input
          type="date"
          className="input-text_add_member"
          placeholder="Date of Leaving"
          value={dateLeaving}
          onChange={(e) => setDateLeaving(e.target.value)}
        />
        <input
          type="text"
          className="input-text_add_member"
          placeholder="Working Location"
          value={workingLocation}
          onChange={(e) => setWorkingLocation(e.target.value)}
        />
        <input
          type="text"
          className="input-text_add_member"
          placeholder="Adhar Number"
          value={adharNumber}
          onChange={(e) => setAdharNumber(e.target.value)}
        />
        <input
          type="text"
          className="input-text_add_member"
          placeholder="Costing"
          value={costing}
          onChange={(e) => setCosting(e.target.value)}
        />
        <input
          type="text"
          className="input-text_add_member"
          placeholder="Alternative Number"
          value={alternativeNumber}
          onChange={(e) => setAlternativeNumber(e.target.value)}
        />
        <div className="button-group_add_member">
          <button className="button_add_member" onClick={() => fetchBeds(1)}>1 Sharing</button>
          <button className="button_add_member" onClick={() => fetchBeds(2)}>2 Sharing</button>
          <button className="button_add_member" onClick={() => fetchBeds(3)}>3 Sharing</button>
          <button className="button_add_member" onClick={() => fetchBeds(4)}>4 Sharing</button>
        </div>
        <div className="search-bar_add_member">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => filterBeds(e.target.value)}
            className="input-text_add_member"
          />
        </div>
        <div className="radio-group_add_member">
          {(searchTerm ? filteredBeds : beds).map(bed => (
            <div className="radio-item_add_member" key={bed.bedId}>
              <input
                type="radio"
                className="radio-input_add_member"
                id={`bed_${bed.bedId}`}
                name="bed"
                value={bed.bedId}
                onChange={() => setSelectedBed(bed.bedId)}
                checked={selectedBed === bed.bedId}
              />
              <label htmlFor={`bed_${bed.bedId}`} className="radio-label_add_member">
                {`Building: ${bed.buildingName}, Floor: ${bed.floor_number}, Flat: ${bed.flat_number}, Room: ${bed.room_number}, Bed: ${bed.bed_number}`}
              </label>
            </div>
          ))}
        </div>
        <button className="button_add_member" onClick={addMember}>Add Member</button>
      </div>
      {showModal && <SuccessModal onClose={closeModal} />}
    </div>
  );
}

export default AddMember;