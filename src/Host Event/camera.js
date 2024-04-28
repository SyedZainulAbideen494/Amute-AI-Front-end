import React, { useState, useCallback } from 'react';
import QrReader from 'react-qr-scanner';

const QRScanner = () => {
  const [qrData, setQrData] = useState('');

  // Function to handle QR code scanning
  const handleScan = useCallback((data) => {
    if (data) {
      setQrData(data);
      // Redirect to the URL in the QR code
      window.location.href = data;
    }
  }, []);

  // Function to handle errors during scanning
  const handleError = useCallback((error) => {
    console.error('QR code scanning error:', error);
  }, []);

  return (
    <div>
      {/* QR scanner component */}
      <QrReader
        delay={300}
        onError={handleError}
        onScan={handleScan}
        style={{ width: '100%' }}
      />
      {/* Display QR data if available */}
      {qrData && <p>QR Code Data: {qrData}</p>}
    </div>
  );
};

export default QRScanner;