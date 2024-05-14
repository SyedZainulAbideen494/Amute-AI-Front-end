import React, { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './event.css';
import QRCode from 'qrcode.react';

const JoinedEventsData = () => {
    const [userQueues, setUserQueues] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        // Fetch user information using the token from local storage
        const fetchUserInfo = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('Token not found in localStorage');
                return;
            }
            try {
                const response = await fetch('https://ba90-122-172-80-187.ngrok-free.app/api/fetch/user/info', {
                    headers: {
                        Authorization: token
                    }
                });
                if (response.ok) {
                    const userInfo = await response.json();
                    fetchUserQueues(userInfo.id);
                } else {
                    console.error('Failed to fetch user info');
                }
            } catch (error) {
                console.error('Error fetching user info:', error);
            }
        };

        fetchUserInfo();
    }, []);

    const fetchUserQueues = async (userId) => {
        try {
            const response = await fetch(`https://ba90-122-172-80-187.ngrok-free.app/api/fetch/user/queues/${userId}`);
            if (response.ok) {
                const userQueuesData = await response.json();
                setUserQueues(userQueuesData);
            } else {
                console.error('Failed to fetch user queues');
            }
        } catch (error) {
            console.error('Error fetching user queues:', error);
        }
    };

    const QueueId = userQueues.queue_id

    const fetchEventDetails = async (queueId) => {
        try {
            const response = await fetch(`https://ba90-122-172-80-187.ngrok-free.app/get/event/${queueId}`);
            if (response.ok) {
                const eventData = await response.json();
                return eventData.name;
            } else {
                console.error('Failed to fetch event details');
                return '';
            }
        } catch (error) {
            console.error('Error fetching event details:', error);
            return '';
        }
    };

    const formatTime = (hour, minute) => {
        const formattedHour = hour.toString().padStart(2, '0');
        const formattedMinute = minute.toString().padStart(2, '0');
        return `${formattedHour}:${formattedMinute}`;
    };

    const [showExpired, setShowExpired] = useState(false);

    const handleToggle = () => {
        setShowExpired(!showExpired);
    };

    return (
        <Fragment>
            <div className="event-details-container_joined_event">
                <h2 className="event-details-heading_attendee" style={{ textAlign: 'center' }}>
                    <span style={{ color: '#9F9BEA' }}>Joined</span> Queues
                </h2>
                {userQueues.length === 0 ? (
                    <p style={{ textAlign: 'center' }}>No queues</p>
                ) : (
                    <Fragment>
                        <button
    style={{
        padding: '8px 16px',
        backgroundColor: '#9F9BEA',
        color: '#ffffff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        marginBottom: '10px',
    }}
    onClick={handleToggle}
>
    {showExpired ? 'Show Active Queues' : 'Show Expired Queues'}
</button>
                        {userQueues
                            .filter(queue => showExpired ? true : queue.status === 'active')
                            .map(queue => (
                                <div key={queue.id} className="queue-details">
                                    <p><span className="detail-label_joined_event">Queue Name:</span> {queue.queue_name}</p>
                                    <p><span className="detail-label_joined_event">Time:</span> {formatTime(queue.hour, queue.minute)}</p>
                                    <p><b>Status: {queue.status === 'active' ? 'Active' : 'Expired'}</b></p>
                                </div>
                            ))
                        }
                    </Fragment>
                )}
            </div>
        </Fragment>
    );
};

export default JoinedEventsData;