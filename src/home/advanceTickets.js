import React, { useState, useEffect } from 'react';
import { formatDistanceToNow } from 'date-fns';
import './home.css'; // Import the CSS file for styling
import { API_ROUTES } from '../app-modules/api_routes'; // Import your API routes

const AdvanceTickets = () => {
  const [advanceTickets, setAdvanceTickets] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAdvanceTickets();
  }, []);

  const fetchAdvanceTickets = async () => {
    try {
      const response = await fetch(API_ROUTES.getAdvanceTickets);
      if (!response.ok) {
        throw new Error('Failed to fetch advance tickets');
      }
      const data = await response.json();
      // Sort the tickets by created_at timestamp in descending order
      data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      setAdvanceTickets(data);
    } catch (error) {
      setError(error.message);
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="revenue-container">
      <h2>Advance Payments</h2>
      {advanceTickets.map(ticket => (
        <div className="ticket-card" key={ticket.id}>
          <h4>Email:</h4>
          <p>{ticket.customer_email}</p>
          <h4>Time:</h4>
          <p>{formatDistanceToNow(new Date(ticket.created_at), { addSuffix: true })}</p>
          <h4>Phone Number:</h4>
          <p>{ticket.sender_id}</p>
        </div>
      ))}
    </div>
  );
};

export default AdvanceTickets;