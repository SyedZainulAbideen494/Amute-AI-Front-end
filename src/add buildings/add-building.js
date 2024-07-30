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
                    <li><Link to='/buildings'>Buildings Data</Link></li>
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

                    {/* List Buildings */}
                    <div className="list-section">
                        <h2 className="sub-heading">Existing Buildings</h2>
                        <ul>
                            {buildings.map(building => (
                                <li key={building.id}>
                                    {building.name}
                                    <button className="action-button" onClick={() => deleteBuilding(building.id)}>Delete</button>
                                </li>
                            ))}
                        </ul>
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

                    {/* List Floors */}
                    <div className="list-section">
                        <h2 className="sub-heading">Existing Floors</h2>
                        <ul>
                            {floors.map(floor => (
                                <li key={floor.id}>
                                    Floor {floor.floor_number} in Building {floor.building_name}
                                    <button className="action-button" onClick={() => deleteFloor(floor.id)}>Delete</button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Add Flat Section */}
                    <div className="form-section-add-buildings">
                        <h2 className="sub-heading">Add Flat</h2>
                        <select className="select-dropdown" onChange={(e) => setFloorId(e.target.value)}>
                            <option value="">Select Floor</option>
                            {floors.map(floor => (
                                <option key={floor.id} value={floor.id}>
                                    Floor {floor.floor_number} - Building {floor.building_name}
                                </option>
                            ))}
                        </select>
                        <input className="input-field" value={flatNumber} onChange={(e) => setFlatNumber(e.target.value)} placeholder="Flat Number" />
                        <button className="action-button" onClick={addFlat}>Add Flat</button>
                    </div>

                    {/* List Flats */}
                    <div className="list-section">
                        <h2 className="sub-heading">Existing Flats</h2>
                        <ul>
                            {flats.map(flat => (
                                <li key={flat.id}>
                                    Flat {flat.flat_number} on Floor {flat.floor_number} in Building {flat.building_name}
                                    <button className="action-button" onClick={() => deleteFlat(flat.id)}>Delete</button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Add Room Section */}
                    <div className="form-section-add-buildings">
                        <h2 className="sub-heading">Add Room</h2>
                        <select className="select-dropdown" onChange={(e) => setFlatId(e.target.value)}>
                            <option value="">Select Flat</option>
                            {flats.map(flat => (
                                <option key={flat.id} value={flat.id}>
                                    Flat {flat.flat_number} - Floor {flat.floor_number} - Building {flat.building_name}
                                </option>
                            ))}
                        </select>
                        <input className="input-field" value={roomNumber} onChange={(e) => setRoomNumber(e.target.value)} placeholder="Room Number" />
                        <select className="select-dropdown" value={sharing} onChange={(e) => setSharing(e.target.value)}>
                            <option value="">Select Sharing</option>
                            {[...Array(7).keys()].map(num => (
                                <option key={num + 1} value={num + 1}>{num + 1}</option>
                            ))}
                        </select>
                        <button className="action-button" onClick={addRoom}>Add Room</button>
                    </div>

                    {/* List Rooms */}
                    <div className="list-section">
                        <h2 className="sub-heading">Existing Rooms</h2>
                        <ul>
                            {rooms.map(room => (
                                <li key={room.id}>
                                    Room {room.room_number} in Flat {room.flat_number} - Floor {room.floor_number} - Building {room.building_name}
                                    <button className="action-button" onClick={() => deleteRoom(room.id)}>Delete</button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Add Bed Section */}
                    <div className="form-section-add-buildings">
                        <h2 className="sub-heading">Add Bed</h2>
                        <select className="select-dropdown" onChange={(e) => setRoomId(e.target.value)}>
                            <option value="">Select Room</option>
                            {rooms.map(room => (
                                <option key={room.id} value={room.id}>
                                    Room {room.room_number} - Flat {room.flat_number} - Floor {room.floor_number} - Building {room.building_name}
                                </option>
                            ))}
                        </select>
                        <input className="input-field" value={bedNumber} onChange={(e) => setBedNumber(e.target.value)} placeholder="Bed Number" />
                        <button className="action-button" onClick={addBed}>Add Bed</button>
                    </div>

                    {/* List Beds */}
                    <div className="list-section">
                        <h2 className="sub-heading">Existing Beds</h2>
                        <ul>
                            {beds.map(bed => (
                                <li key={bed.id}>
                                    Bed {bed.bed_number} in Room {bed.room_number} - Flat {bed.flat_number} - Floor {bed.floor_number} - Building {bed.building_name}
                                    <button className="action-button" onClick={() => deleteBed(bed.id)}>Delete</button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Error/Success Messages */}
                    {error && <p className="error-message">{error}</p>}
                    
                    {/* Modal for Success Messages */}
                    <Modal isOpen={modalOpen} onClose={closeModal}>
                        {modalMessage}
                    </Modal>
                </div>
            </div>
        </div>
    );
};

export default AddBuilding;
