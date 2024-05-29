import React, { useEffect, useState } from 'react';
import './Notification.css';
import ConversationsPage from '../conversations/conversationsTeam';
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
        setPhoneNumbers(data);
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
                      <span className="created-at">{phoneNumber.created_at}</span>
                  </li>
              ))}
          </ul>
      </div>
  </div>
    );
};

export default NotificationModal;