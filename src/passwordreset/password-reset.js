import React, { useState } from 'react';
import axios from 'axios';
import './passwordreset.css'; // Import the CSS file

function Passwordreset() {
  const [email, setEmail] = useState('');
  const [emailSent, setEmailSent] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailSent(false); // Reset the email sent status if the email changes
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send email to the server
      await axios.post('http://localhost:8080/send-email', { email });
      setEmailSent(true); // Set email sent status to true upon successful submission
    } catch (error) {
      console.error('Error sending email:', error.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="password-reset-form">
        <label>
          Enter Email:
          <input type="email" value={email} onChange={handleEmailChange} />
        </label>
        {emailSent && <p>Email sent!</p>}
        <button type="submit">Send Email</button>
      </form>
    </div>
  );
}

export default Passwordreset;