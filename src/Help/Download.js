import React from 'react';

const DownloadAPK = () => {
  const handleDownload = () => {
    // Assuming your Node.js server is running on localhost:3001 and serves the APK as /download/myapp.apk
    window.location.href = 'https://ba90-122-172-80-187.ngrok-free.app/download/myapp.apk';
  };

  const buttonStyle = {
    backgroundColor: '#4CAF50',
    border: 'none',
    color: 'white',
    padding: '9px 25px',
    textAlign: 'center',
    textDecoration: 'none',
    display: 'inline-block',
    fontSize: '16px',
    margin: '4px 2px',
    cursor: 'pointer',
    borderRadius: '8px'
  };

  const containerStyle = {
    textAlign: 'center'
  };

  const headingStyle = {
    color: '#333',
    fontFamily: 'Arial, sans-serif'
  };

  return (
    <div style={containerStyle}>
      <h2 style={headingStyle}>Download For Android</h2>
      <button style={buttonStyle} onClick={handleDownload}>Download</button>
    </div>
  );
};

export default DownloadAPK;