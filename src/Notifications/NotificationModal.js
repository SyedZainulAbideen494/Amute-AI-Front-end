import React, { useEffect, useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import './Notification.css';
import { API_ROUTES } from '../app-modules/api_routes';

const NotificationModal = ({ onClose }) => {
    const [phoneNumbers, setPhoneNumbers] = useState([]);

    useEffect(() => {
        fetchPhoneNumbers();
    }, []);

    const fetchPhoneNumbers = async () => {
        try {
            const response = await fetch(API_ROUTES.getPhoneNumbers);
            const data = await response.json();

            // Sort phone numbers by created_at in descending order
            const sortedData = data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
            setPhoneNumbers(sortedData);
        } catch (error) {
            console.error('Error fetching phone numbers:', error);
        }
    };

    return (
        <div className="modal-noti-modal">
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <h2>Notifications</h2>
                <ul>
                    {phoneNumbers.map((phoneNumber, index) => (
                        <li key={index} className="notification-item">
                            <span className="phone-number">{phoneNumber.phone_number}</span>
                            <span className="conversation-type">{phoneNumber.conversation_type}</span>
                            <span className="created-at">
                                {formatDistanceToNow(new Date(phoneNumber.created_at), { addSuffix: true })}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default NotificationModal;