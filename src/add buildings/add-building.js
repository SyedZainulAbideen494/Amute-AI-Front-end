import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './add-building.css';
import { API_ROUTES } from '../app-modules/api_routes';
import Modal from '../app-modules/modal'; // Import the Modal component

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
    const [bedId, setBedId] = useState('');

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState('');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const [buildingsData, floorsData, flatsData, roomsData, bedsData] = await Promise.all([
                axios.get(API_ROUTES.fetchBuildingsAddBuildings),
                axios.get(API_ROUTES.fetchFloorsAddBuildings),
                axios.get(API_ROUTES.fetchFlatsAddBuildings),
                axios.get(API_ROUTES.fetchRoomsAddBuildings),
                axios.get(API_ROUTES.fetchBedsAddBuildings),
            ]);
            setBuildings(buildingsData.data);
            setFloors(floorsData.data);
            setFlats(flatsData.data);
            setRooms(roomsData.data);
            setBeds(bedsData.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    const showModal = (message) => {
        setModalMessage(message);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        fetchData(); // Refresh the data
    };

    const addBuilding = async () => {
        try {
            await axios.post(API_ROUTES.addBuildings, { name: buildingName });
            setBuildingName('');
            showModal('Building added successfully!');
        } catch (error) {
            setError('Error adding building');
            console.error('Error adding building:', error);
        }
    };

    const addFloor = async () => {
        try {
            await axios.post(API_ROUTES.addFloor, { building_id: buildingId, floor_number: floorNumber });
            setFloorNumber('');
            showModal('Floor added successfully!');
        } catch (error) {
            setError('Error adding floor');
            console.error('Error adding floor:', error);
        }
    };

    const addFlat = async () => {
        try {
            await axios.post(API_ROUTES.addFlat, { floor_id: floorId, flat_number: flatNumber });
            setFlatNumber('');
            showModal('Flat added successfully!');
        } catch (error) {
            setError('Error adding flat');
            console.error('Error adding flat:', error);
        }
    };

    const addRoom = async () => {
        try {
            await axios.post(API_ROUTES.addRoom, { flat_id: flatId, room_number: roomNumber, sharing });
            setRoomNumber('');
            setSharing('');
            showModal('Room added successfully!');
        } catch (error) {
            setError('Error adding room');
            console.error('Error adding room:', error);
        }
    };

    const addBed = async () => {
        try {
            await axios.post(API_ROUTES.addBed, { room_id: roomId, bed_number: bedNumber });
            setBedNumber('');
            showModal('Bed added successfully!');
        } catch (error) {
            setError('Error adding bed');
            console.error('Error adding bed:', error);
        }
    };

    const deleteBuilding = async (id) => {
        try {
            await axios.delete(API_ROUTES.deleteBuilding(id));
            showModal('Building deleted successfully!');
        } catch (error) {
            setError('Error deleting building');
            console.error('Error deleting building:', error);
        }
    };
    
    const deleteFloor = async (id) => {
        try {
            await axios.delete(API_ROUTES.deleteFloor(id));
            showModal('Floor deleted successfully!');
        } catch (error) {
            setError('Error deleting floor');
            console.error('Error deleting floor:', error);
        }
    };
    
    const deleteFlat = async (id) => {
        try {
            await axios.delete(API_ROUTES.deleteFlat(id));
            showModal('Flat deleted successfully!');
        } catch (error) {
            setError('Error deleting flat');
            console.error('Error deleting flat:', error);
        }
    };
    
    const deleteRoom = async (id) => {
        try {
            await axios.delete(API_ROUTES.deleteRoom(id));
            showModal('Room deleted successfully!');
        } catch (error) {
            setError('Error deleting room');
            console.error('Error deleting room:', error);
        }
    };
    
    const deleteBed = async (id) => {
        try {
            await axios.delete(API_ROUTES.deleteBed(id));
            showModal('Bed deleted successfully!');
        } catch (error) {
            setError('Error deleting bed');
            console.error('Error deleting bed:', error);
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
                    <li><Link to="/building/add">Add Building</Link></li>
                </ul>
            </nav>
            <div className="main-statements">
                <div className="container-add-buildings">
                    <h1 className="heading">Manage Buildings</h1>
                    
                    {/* Add Building Section */}
                    <div className="form-section-add-buildings">
                        <h2 className="sub-heading">Add Building</h2>
                        <input className="input-field" value={buildingName} onChange={(e) => setBuildingName(e.target.value)} placeholder="Building Name" />
                        <button className="action-button" onClick={addBuilding}>Add Building</button>
                    </div>
                    
                    {/* Add Floor Section */}
                    <div className="form-section-add-buildings">
                        <h2 className="sub-heading">Add Floor</h2>
                        <select className="select-dropdown" onChange={(e) => setBuildingId(e.target.value)}>
                            <option value="">Select Building</option>
                            {buildings.map(building => <option key={building.id} value={building.id}>{building.name}</option>)}
                        </select>
                        <input className="input-field" value={floorNumber} onChange={(e) => setFloorNumber(e.target.value)} placeholder="Floor Number" />
                        <button className="action-button" onClick={addFloor}>Add Floor</button>
                    </div>
                    
                    {/* Add Flat Section */}
                    <div className="form-section-add-buildings">
                        <h2 className="sub-heading">Add Flat</h2>
                        <select className="select-dropdown" onChange={(e) => setFloorId(e.target.value)}>
                            <option value="">Select Floor</option>
                            {floors.map(floor => <option key={floor.id} value={floor.id}>{floor.number}</option>)}
                        </select>
                        <input className="input-field" value={flatNumber} onChange={(e) => setFlatNumber(e.target.value)} placeholder="Flat Number" />
                        <button className="action-button" onClick={addFlat}>Add Flat</button>
                    </div>
                    
                    {/* Add Room Section */}
                    <div className="form-section-add-buildings">
                        <h2 className="sub-heading">Add Room</h2>
                        <select className="select-dropdown" onChange={(e) => setFlatId(e.target.value)}>
                            <option value="">Select Flat</option>
                            {flats.map(flat => <option key={flat.id} value={flat.id}>{flat.number}</option>)}
                        </select>
                        <input className="input-field" value={roomNumber} onChange={(e) => setRoomNumber(e.target.value)} placeholder="Room Number" />
                        <select className="select-dropdown" onChange={(e) => setSharing(e.target.value)}>
                            <option value="">Select Sharing</option>
                            <option value="Single">Single</option>
                            <option value="Double">Double</option>
                        </select>
                        <button className="action-button" onClick={addRoom}>Add Room</button>
                    </div>
                    
                    {/* Add Bed Section */}
                    <div className="form-section-add-buildings">
                        <h2 className="sub-heading">Add Bed</h2>
                        <select className="select-dropdown" onChange={(e) => setRoomId(e.target.value)}>
                            <option value="">Select Room</option>
                            {rooms.map(room => <option key={room.id} value={room.id}>{room.number}</option>)}
                        </select>
                        <input className="input-field" value={bedNumber} onChange={(e) => setBedNumber(e.target.value)} placeholder="Bed Number" />
                        <button className="action-button" onClick={addBed}>Add Bed</button>
                    </div>
                    
                    {/* Delete Building Section */}
                    <div className="form-section-add-buildings">
                        <h2 className="sub-heading">Delete Building</h2>
                        <select className="select-dropdown" onChange={(e) => setBuildingId(e.target.value)}>
                            <option value="">Select Building</option>
                            {buildings.map(building => <option key={building.id} value={building.id}>{building.name}</option>)}
                        </select>
                        <button className="action-button" onClick={() => deleteBuilding(buildingId)}>Delete Building</button>
                    </div>
                    
                    {/* Delete Floor Section */}
                    <div className="form-section-add-buildings">
                        <h2 className="sub-heading">Delete Floor</h2>
                        <select className="select-dropdown" onChange={(e) => setFloorId(e.target.value)}>
                            <option value="">Select Floor</option>
                            {floors.map(floor => <option key={floor.id} value={floor.id}>{floor.number}</option>)}
                        </select>
                        <button className="action-button" onClick={() => deleteFloor(floorId)}>Delete Floor</button>
                    </div>
                    
                    {/* Delete Flat Section */}
                    <div className="form-section-add-buildings">
                        <h2 className="sub-heading">Delete Flat</h2>
                        <select className="select-dropdown" onChange={(e) => setFlatId(e.target.value)}>
                            <option value="">Select Flat</option>
                            {flats.map(flat => <option key={flat.id} value={flat.id}>{flat.number}</option>)}
                        </select>
                        <button className="action-button" onClick={() => deleteFlat(flatId)}>Delete Flat</button>
                    </div>
                    
                    {/* Delete Room Section */}
                    <div className="form-section-add-buildings">
                        <h2 className="sub-heading">Delete Room</h2>
                        <select className="select-dropdown" onChange={(e) => setRoomId(e.target.value)}>
                            <option value="">Select Room</option>
                            {rooms.map(room => <option key={room.id} value={room.id}>{room.number}</option>)}
                        </select>
                        <button className="action-button" onClick={() => deleteRoom(roomId)}>Delete Room</button>
                    </div>
                    
                    {/* Delete Bed Section */}
                    <div className="form-section-add-buildings">
                        <h2 className="sub-heading">Delete Bed</h2>
                        <select className="select-dropdown" onChange={(e) => setBedId(e.target.value)}>
                            <option value="">Select Bed</option>
                            {beds.map(bed => <option key={bed.id} value={bed.id}>{bed.number}</option>)}
                        </select>
                        <button className="action-button" onClick={() => deleteBed(bedId)}>Delete Bed</button>
                    </div>
                </div>
            </div>
            <Modal isOpen={modalOpen} message={modalMessage} onClose={closeModal} />
        </div>
    );
};

export default AddBuilding;