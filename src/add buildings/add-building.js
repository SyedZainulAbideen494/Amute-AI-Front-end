import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './add-building.css';

const AddBuilding = () => {
    const [buildings, setBuildings] = useState([]);
    const [floors, setFloors] = useState([]);
    const [flats, setFlats] = useState([]);
    const [rooms, setRooms] = useState([]);
    const [beds, setBeds] = useState([]);

    const [buildingName, setBuildingName] = useState('');
    const [buildingId, setBuildingId] = useState('');
    const [floorNumber, setFloorNumber] = useState('');
    const [floorId, setFloorId] = useState('');
    const [flatNumber, setFlatNumber] = useState('');
    const [flatId, setFlatId] = useState('');
    const [roomNumber, setRoomNumber] = useState('');
    const [sharing, setSharing] = useState('');
    const [roomId, setRoomId] = useState('');
    const [bedNumber, setBedNumber] = useState('');

    useEffect(() => {
        fetchBuildings();
        fetchFloors();
        fetchFlats();
        fetchRooms();
        fetchBeds();
    }, []);

    const fetchBuildings = async () => {
        try {
            const response = await axios.get('http://localhost:8080/buildings');
            setBuildings(response.data);
        } catch (error) {
            console.error('Error fetching buildings:', error);
        }
    };

    const fetchFloors = async () => {
        try {
            const response = await axios.get('http://localhost:8080/floors');
            setFloors(response.data);
        } catch (error) {
            console.error('Error fetching floors:', error);
        }
    };

    const fetchFlats = async () => {
        try {
            const response = await axios.get('http://localhost:8080/flats');
            setFlats(response.data);
        } catch (error) {
            console.error('Error fetching flats:', error);
        }
    };

    const fetchRooms = async () => {
        try {
            const response = await axios.get('http://localhost:8080/rooms');
            setRooms(response.data);
        } catch (error) {
            console.error('Error fetching rooms:', error);
        }
    };

    const fetchBeds = async () => {
        try {
            const response = await axios.get('http://localhost:8080/beds');
            setBeds(response.data);
        } catch (error) {
            console.error('Error fetching beds:', error);
        }
    };

    const addBuilding = async () => {
        try {
            await axios.post('http://localhost:8080/buildings', { name: buildingName });
            setBuildingName('');
            await fetchBuildings(); // Refresh buildings list
        } catch (error) {
            console.error('Error adding building:', error);
        }
    };

    const addFloor = async () => {
        try {
            await axios.post('http://localhost:8080/floors', { building_id: buildingId, floor_number: floorNumber });
            setFloorNumber('');
            await fetchFloors(); // Refresh floors list
        } catch (error) {
            console.error('Error adding floor:', error);
        }
    };

    const addFlat = async () => {
        try {
            await axios.post('http://localhost:8080/flats', { floor_id: floorId, flat_number: flatNumber });
            setFlatNumber('');
            await fetchFlats(); // Refresh flats list
        } catch (error) {
            console.error('Error adding flat:', error);
        }
    };

    const addRoom = async () => {
        try {
            await axios.post('http://localhost:8080/rooms', { flat_id: flatId, room_number: roomNumber, sharing });
            setRoomNumber('');
            setSharing('');
            await fetchRooms(); // Refresh rooms list
        } catch (error) {
            console.error('Error adding room:', error);
        }
    };

    const addBed = async () => {
        try {
            await axios.post('http://localhost:8080/beds', { room_id: roomId, bed_number: bedNumber });
            setBedNumber('');
            await fetchBeds(); // Refresh beds list
        } catch (error) {
            console.error('Error adding bed:', error);
        }
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
                </ul>
            </nav>
            <div className="main-statements">
                <div className="container">
                    <h1 className="heading">Manage Buildings</h1>
                    <div className="form-section">
                        <h2 className="heading">Add Building</h2>
                        <input className="input-field" value={buildingName} onChange={(e) => setBuildingName(e.target.value)} placeholder="Building Name" />
                        <button className="action-button" onClick={addBuilding}>Add Building</button>
                    </div>
                    <div className="form-section">
                        <h2 className="heading">Add Floor</h2>
                        <select className="select-dropdown" onChange={(e) => setBuildingId(e.target.value)}>
                            <option value="">Select Building</option>
                            {buildings.map(building => <option key={building.id} value={building.id}>{building.name}</option>)}
                        </select>
                        <input className="input-field" value={floorNumber} onChange={(e) => setFloorNumber(e.target.value)} placeholder="Floor Number" />
                        <button className="action-button" onClick={addFloor}>Add Floor</button>
                    </div>
                    <div className="form-section">
                        <h2 className="heading">Add Flat</h2>
                        <select className="select-dropdown" onChange={(e) => setFloorId(e.target.value)}>
                            <option value="">Select Floor</option>
                            {floors.map(floor => <option key={floor.id} value={floor.id}>{floor.building_name} - Floor {floor.floor_number}</option>)}
                        </select>
                        <input className="input-field" value={flatNumber} onChange={(e) => setFlatNumber(e.target.value)} placeholder="Flat Number" />
                        <button className="action-button" onClick={addFlat}>Add Flat</button>
                    </div>
                    <div className="form-section">
                        <h2 className="heading">Add Room</h2>
                        <select className="select-dropdown" onChange={(e) => setFlatId(e.target.value)}>
                            <option value="">Select Flat</option>
                            {flats.map(flat => <option key={flat.id} value={flat.id}>{flat.building_name} - Floor {flat.floor_number} - Flat {flat.flat_number}</option>)}
                        </select>
                        <input className="input-field" value={roomNumber} onChange={(e) => setRoomNumber(e.target.value)} placeholder="Room Number" />
                        <input className="input-field" value={sharing} onChange={(e) => setSharing(e.target.value)} placeholder="Sharing" />
                        <button className="action-button" onClick={addRoom}>Add Room</button>
                    </div>
                    <div className="form-section">
                        <h2 className="heading">Add Bed</h2>
                        <select className="select-dropdown" onChange={(e) => setRoomId(e.target.value)}>
                            <option value="">Select Room</option>
                            {rooms.map(room => <option key={room.id} value={room.id}>{room.building_name} - Floor {room.floor_number} - Flat {room.flat_number} - Room {room.room_number}</option>)}
                        </select>
                        <input className="input-field" value={bedNumber} onChange={(e) => setBedNumber(e.target.value)} placeholder="Bed Number" />
                        <button className="action-button" onClick={addBed}>Add Bed</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddBuilding;








