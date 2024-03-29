import React, { useState } from 'react';
import axios from 'axios';
import { API_ROUTES } from '../app-modules/api_routes';

const ProfilePicUpload = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));
  
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
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    };
  
    return (
      <div>
        <input type="file" onChange={handleFileChange} />
        <button onClick={handleUpload}>Upload</button>
      </div>
    );
  };

export default ProfilePicUpload;