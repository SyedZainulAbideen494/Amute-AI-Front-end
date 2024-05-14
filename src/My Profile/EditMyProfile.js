import React, { useState } from 'react';
import axios from 'axios';
import { API_ROUTES } from '../app-modules/api_routes';

const ProfilePicUpload = ({ onClose }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [successMessage, setSuccessMessage] = useState('');

    const handleFileChange = (event) => {
      setSelectedFile(event.target.files[0]);
    };
  
    const handleUpload = () => {
      const formData = new FormData();
      formData.append('profilePic', selectedFile);
  
      fetch(API_ROUTES.addProfilePic, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data); // Handle response from server
          setSuccessMessage('Profile picture uploaded successfully.');
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    };

    const handleRemove = () => {
      // Make a request to remove the profile picture
      axios.put('https://ba90-122-172-80-187.ngrok-free.app/api/removeProfilePic', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          console.log(response.data); // Handle successful response
          setSuccessMessage('Profile picture removed successfully.');
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    };

    const handleClose = () => {
      onClose(); // Call the onClose function passed from the parent component
    };
  
    return (
      <div className="profile-pic-upload">
        <label htmlFor="file-upload" className="upload-label" style={{textDecoration:'underline', cursor: 'pointer'}}>Choose a profile picture:</label>
        <input id="file-upload" type="file" onChange={handleFileChange} />
        <button className="upload-button" onClick={handleUpload}>Upload</button>
        <button className="close-button" onClick={handleClose}>Close</button>
        {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      </div>
    );
};

export default ProfilePicUpload;