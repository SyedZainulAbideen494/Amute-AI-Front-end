import React, { useEffect, useState } from 'react';
import './Notification.css';

const NotificationModal = ({ onClose }) => {
    const [userInfo, setUserInfo] = useState(null); // Change initial state to null
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    setError('Token not found in localStorage');
                    return;
                }
                const response = await fetch('https://ba90-122-172-80-187.ngrok-free.app/api/fetch/user/info', {
                    headers: {
                        Authorization: token
                    }
                });
                if (response.ok) {
                    const data = await response.json();
                    setUserInfo(data);
                } else {
                    setError('Failed to fetch user info');
                }
            } catch (error) {
                setError('Error fetching user info: ' + error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUserInfo();
    }, []); // Empty dependency array

    useEffect(() => {
        if (userInfo) { // Check if userInfo is available before fetching notifications
            const fetchNotifications = async () => {
                try {
                    const token = localStorage.getItem('token');
                    if (!token) {
                        setError('Token not found in localStorage');
                        return;
                    }
                    const response = await fetch(`https://ba90-122-172-80-187.ngrok-free.app/api/notifications/${userInfo.id}`, {
                        headers: {
                            Authorization: token
                        }
                    });
                    if (response.ok) {
                        const data = await response.json();
                        setNotifications(data);
                    } else {
                        setError('Failed to fetch notifications');
                    }
                } catch (error) {
                    setError('Error fetching notifications: ' + error.message);
                } finally {
                    setLoading(false);
                }
            };

            fetchNotifications();
        }
    }, [userInfo]); // Dependency on userInfo

    const formatTimestamp = (timestamp) => {
        const date = new Date(timestamp);
        return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
    };

    return (
        <div className="modal_notiModal">
            <div className="modal-content_notiModal">
                <span className="close_notiModal" onClick={onClose}>&times;</span>
                <h2>Notifications</h2>
                {loading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p>{error}</p>
                ) : (
                    <ul>
                        {notifications.map(notification => (
                            <li key={notification.id}>
                                <div className="notification-box">
                                    <span className="notification-message">{notification.message}</span><br />
                                    <span className="notification-timestamp">{formatTimestamp(notification.created_at)}</span>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default NotificationModal;