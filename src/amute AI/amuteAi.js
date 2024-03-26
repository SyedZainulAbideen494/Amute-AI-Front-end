import React, { useState } from 'react';
import axios from 'axios';
import { API_ROUTES } from '../app-modules/api_routes';
import './amuteAi.css';

const AmuteAi = () => {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSendMessage = async () => {
    try {
      const res = await axios.post(API_ROUTES.amuteAi, { message });
      setResponse(res.data.message);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="amute-ai-container">
      <h3>Amute AI</h3>
      <div className="amute-ai-response">{response}</div>
      <input
        type="text"
        value={message}
        onChange={handleMessageChange}
        className="amute-ai-input"
        placeholder="Ask Amute..."
      />
      <button onClick={handleSendMessage} className="amute-ai-button">Send</button>
    </div>
  );
};

export default AmuteAi;