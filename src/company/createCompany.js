import React, { useState } from 'react';
import axios from 'axios';
import { API_ROUTES } from '../app-modules/api_routes';
import './company.css';

const CreateCompany = () => {
  const [companyName, setCompanyName] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleInputChange = (event) => {
    setCompanyName(event.target.value);
  };

  const handleCreateCompany = async () => {
    try {
      const response = await axios.post(API_ROUTES.createCompany, { name: companyName });
      console.log('Company created:', response.data);
      setSuccessMessage('Company created successfully! Please refesh the page');
      setCompanyName(''); // Clear the input field
      // After successfully creating the company, add the user to the company
      await addCurrentUserToCompany(response.data.id);
    } catch (error) {
      console.error('Error creating company:', error);
      setSuccessMessage('Failed to create company');
    }
  };

  const addCurrentUserToCompany = async (companyId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(API_ROUTES.addUserToCompany, { companyId, token });
      console.log('User added to company:', response.data);
    } catch (error) {
      console.error('Error adding user to company:', error);
    }
  };

  return (
    <div className="create-company-container">
      <h2 className="create-company-title">Create Company</h2>
      <input
        type="text"
        className="company-name-input"
        placeholder="Company Name"
        value={companyName}
        onChange={handleInputChange}
      />
      <button className="create-company-button" onClick={handleCreateCompany}>Create</button>
      {successMessage && <p className="success-message">{successMessage}</p>}
    </div>
  );
};

export default CreateCompany;