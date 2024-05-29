import React, { useState, useEffect } from 'react';
import './home.css'; // Import the CSS file for styling
import { API_ROUTES } from '../app-modules/api_routes'; // Import your API routes

const Conversations = () => {
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
    <div className="conversations-container">
      <h2>Conversations</h2>
      <ul>
        {phoneNumbers.map((phoneNumber, index) => (
          <li key={index}>{phoneNumber.phone_number}</li>
        ))}
      </ul>
    </div>
  );
};

export default Conversations;