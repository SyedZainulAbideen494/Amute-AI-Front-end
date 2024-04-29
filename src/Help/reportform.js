import React, { useState } from 'react';
import axios from 'axios';
import './help.css'

const ReportForm = () => {
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/report', { message });
      setMessage(''); // Clear the input field after submitting
      alert('Report submitted successfully!');
    } catch (error) {
      console.error('Error submitting report:', error.message);
      alert('Failed to submit report. Please try again later.');
    }
  };

  return (
    <div className="report-container">
    <h2>Report Bug/Glitch/Improvements/Suggestions</h2>
    <form className="report-form" onSubmit={handleSubmit}>
      <label htmlFor="message">Message:</label>
      <textarea
        id="message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        rows={4}
        cols={50}
        required
      />
      <button type="submit">Submit Report</button>
    </form>
  </div>
  );
};

export default ReportForm;