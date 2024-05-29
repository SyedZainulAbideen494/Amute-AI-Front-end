import React, { useState, useEffect } from 'react';
import './home.css'; // Import the CSS file for styling
import { API_ROUTES } from '../app-modules/api_routes'; // Import your API routes

const Revenue = () => {
  const [revenue, setRevenue] = useState({
    '2 sharing': 0,
    '3 sharing': 0,
    '4 sharing': 0,
    total: 0,
  });

  useEffect(() => {
    fetchRevenue();
  }, []);

  const fetchRevenue = async () => {
    try {
      const response = await fetch(API_ROUTES.getRevenue);
      const data = await response.json();
      setRevenue(data);
    } catch (error) {
      console.error('Error fetching revenue:', error);
    }
  };

  return (
    <div className="revenue-container">
      <h2>Monthly Revenue</h2>
      <div className="revenue-card">
        <h3>2 Sharing</h3>
        <p>Revenue: ₹{revenue['2 sharing']}</p>
      </div>
      <div className="revenue-card">
        <h3>3 Sharing</h3>
        <p>Revenue: ₹{revenue['3 sharing']}</p>
      </div>
      <div className="revenue-card">
        <h3>4 Sharing</h3>
        <p>Revenue: ₹{revenue['4 sharing']}</p>
      </div>
      <div className="total-revenue">
        <h3>Total Revenue</h3>
        <p>₹{revenue.total}</p>
      </div>
    </div>
  );
};

export default Revenue;