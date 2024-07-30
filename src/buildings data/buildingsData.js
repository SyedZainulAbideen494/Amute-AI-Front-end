import React, { useState, useEffect } from "react";
import axios from "axios";
import './buildingsData.css'; // Ensure your CSS file is named correctly
import { Link } from "react-router-dom";

const BuildingsData = () => {
    const [buildings, setBuildings] = useState([]);
    const [selectedBuilding, setSelectedBuilding] = useState(null);
    const [members, setMembers] = useState([]);

    useEffect(() => {
        // Fetch all buildings
        axios.get('http://localhost:8080/api/buildings/display/filter/page')
            .then(response => {
                setBuildings(response.data);
            })
            .catch(error => console.error(error));
    }, []);

    const handleBuildingClick = (buildingId) => {
        setSelectedBuilding(buildingId);
        // Fetch members for the selected building
        axios.get(`http://localhost:8080/api/members/display/filter/page/${buildingId}`)
            .then(response => {
                setMembers(response.data);
            })
            .catch(error => console.error(error));
    };

    const renderMembers = () => {
        const memberLists = {};

        members.forEach(member => {
            if (!memberLists[member.flat_number]) {
                memberLists[member.flat_number] = [];
            }
            memberLists[member.flat_number].push(member);
        });

        return Object.keys(memberLists).map(flatNumber => (
            <div key={flatNumber} className="flat-section">
                <h4>Flat {flatNumber}</h4>
                <ul>
                    {memberLists[flatNumber].map(member => (
                        <li key={member.member_id}>
                            Name: {member.name} <br/>
                            Phone number: {member.phoneno} <br/>
                            Room number: {member.room_number} <br/>
                            Bed number: {member.bed_number}
                        </li>
                    ))}
                </ul>
            </div>
        ));
    };

    return (
        <div className="dashboard-team-container">
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
                    <li><Link to='/buildings'>Buildings Data</Link></li>
                </ul>
            </nav>
            <div className="main-buildings-section">
                <div className="building-buttons">
                    {buildings.map(building => (
                        <button
                            key={building.id}
                            onClick={() => handleBuildingClick(building.id)}
                        >
                            {building.name}
                        </button>
                    ))}
                </div>
                {selectedBuilding && (
                    <div className="members-list">
                        <h2>Members in Building</h2>
                        {renderMembers()}
                    </div>
                )}
            </div>
        </div>
    );
};

export default BuildingsData;