import React, { Fragment, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import './attendeeEvent.css';
import QRCode from 'qrcode.react';

const AttendeeEventData = () => {
    const [eventDetails, setEventDetails] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [selectedTime, setSelectedTime] = useState({ hour: 0, minute: 0 });
    const [timeSlotAvailability, setTimeSlotAvailability] = useState(null); // To store time slot availability
    const [confirmDisabled, setConfirmDisabled] = useState(true); // To disable the Confirm button
    const [userId, setUserId] = useState(null); // To store the user ID
    const [expiredMsg, setExpiredMsg] = useState(false)
    const { id } = useParams();
    const nav = useNavigate()

    useEffect(() => {
        // Fetch event details using the ID from the URL
        const fetchEventDetails = async () => {
            try {
                const response = await fetch(`http://localhost:8080/get/event/${id}`);
                if (response.ok) {
                    const eventData = await response.json();
                    setEventDetails(eventData);
                } else {
                    console.error('Failed to fetch event details');
                }
            } catch (error) {
                console.error('Error fetching event details:', error);
            }
        };

        fetchEventDetails();
    }, [id]);

    useEffect(() => {
        // Fetch user ID from the backend using the token from localStorage
        const fetchUserId = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('Token not found in localStorage');
                return;
            }
            try {
                const response = await fetch('http://localhost:8080/api/fetch/user/info', {
                    headers: {
                        Authorization: token
                    }
                });
                if (response.ok) {
                    const userInfo = await response.json();
                    setUserId(userInfo.id);
                } else {
                    console.error('Failed to fetch user info');
                }
            } catch (error) {
                console.error('Error fetching user info:', error);
            }
        };

        fetchUserId();
    }, []);

    useEffect(() => {
        // Enable or disable Confirm button based on time slot availability
        setConfirmDisabled(timeSlotAvailability === null || !timeSlotAvailability);
    }, [timeSlotAvailability]);

    const handleJoinClick = () => {
        setShowModal(true);
    };

    const handlecloseTimer = () => {
        setShowModal(false)
    }

    const handleexpiredMsg = () => {
        setExpiredMsg(true)
    }
    const handleTimeSelection = async (hour, minute) => {
        setSelectedTime({ hour, minute });
        
        // Convert event start and end times to Date objects
        const startTime = new Date(`2000-01-01T${eventDetails.startTime}`);
        const endTime = new Date(`2000-01-01T${eventDetails.endTime}`);
    
        // Convert selected time to a Date object
        const selectedDateTime = new Date(`2000-01-01T${hour}:${minute}:00`);
    
        // Check if the selected time is within the event's time range
        if (selectedDateTime < startTime || selectedDateTime > endTime) {
            // Selected time is outside the event's time range
            setTimeSlotAvailability(false);
            return;
        }
    
        // Send request to backend to check time slot availability
        try {
            const response = await fetch('http://localhost:8080/checkTimeSlotAvailability', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    queueId: id,
                    selectedTime: { hour, minute }
                })
            });
            if (response.ok) {
                const result = await response.json();
                setTimeSlotAvailability(result.availability);
            } else {
                console.error('Failed to check time slot availability');
            }
        } catch (error) {
            console.error('Error checking time slot availability:', error);
        }
    };

    const handleConfirmClick = async () => {
        // Send request to backend to confirm the time slot
        try {
            const response = await fetch('http://localhost:8080/confirmTimeSlot', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    queueId: id,
                    userId: userId,
                    selectedTime,
                    queueName: eventDetails.name // Adding queue name to the request body
                })
            });
            if (response.ok) {
                // Handle success
                console.log('Time slot confirmed successfully');
                // Redirect to '/Myevents'
                nav('/joinedEvents');
            } else {
                console.error('Failed to confirm time slot');
            }
        } catch (error) {
            console.error('Error confirming time slot:', error);
        }
    };

    return (
        <Fragment>
            <div className="event-details-container_attendee">
                {eventDetails && (
                    <div>
                        <h2 className="event-details-heading_attendee"><span style={{ color: '#9F9BEA' }}>Queue</span> Details</h2>
                        <div className="event-details_attendee">
                            <p><span className="detail-label_attendee">Name:</span> {eventDetails.name}</p>
                            <p><span className="detail-label_attendee">Start Time:</span> {eventDetails.startTime}</p>
                            <p><span className="detail-label_attendee">End Time:</span> {eventDetails.endTime}</p>
                            <p><span className="detail-label_attendee">Date:</span> {eventDetails.date}</p>
                            {eventDetails.status === 'expired' ? (
                        <p>This Queue time Period has expired</p>
                    ) : (
                        <button onClick={handleJoinClick}>Join</button>
                    )}
                </div>
                        </div>
                )}
            </div>
            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <p onClick={handlecloseTimer}>x</p>
                        <h2>Select Time</h2>
                        <p style={{fontFamily: 'Arial, sans-serif', fontSize: '16px', color: '#333', marginBottom: '10px'}}>
  If the event is set to 'forever', the chosen time slot will be applicable for today's date.
</p>
                        <div className="selected-time">
                            Selected Time: {selectedTime.hour.toString().padStart(2, '0')} : {selectedTime.minute.toString().padStart(2, '0')}
                        </div>
                        <div className="time-section">
                            <div className="scrollable">
                                {[...Array(24).keys()].map(hour => (
                                    <div key={hour} onClick={() => handleTimeSelection(hour, selectedTime.minute)} className={selectedTime.hour === hour ? 'selected' : ''}>{hour.toString().padStart(2, '0')}</div>
                                ))}
                            </div>
                        </div>
                        <h2>--</h2>
                        <div className="time-section">
                            <div className="scrollable">
                                {[...Array(60).keys()].filter(minute => minute % 5 === 0).map(minute => (
                                    <div key={minute} onClick={() => handleTimeSelection(selectedTime.hour, minute)} className={selectedTime.minute === minute ? 'selected' : ''}>{minute.toString().padStart(2, '0')}</div>
                                ))}
                            </div>
                        </div>
                        <div className="confirm-btn-container">
    <button className="confirm-btn-time-slot" onClick={handleConfirmClick} disabled={confirmDisabled}>Confirm</button>
</div>

                        {timeSlotAvailability !== null && (
                            <p className={`time-slot-availability-msg ${timeSlotAvailability ? 'available' : 'unavailable'}`}>
                            {timeSlotAvailability ? 'Time slot is available' : 'Time slot is not available'}
                        </p>
                        )}
                    </div>
                </div>
            )}
        </Fragment>
    );
};

export default AttendeeEventData;