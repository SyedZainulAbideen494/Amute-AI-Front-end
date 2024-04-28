import React, { useRef, useState } from 'react';
import QrReader from 'react-qr-scanner';

const QRScanner = () => {
  const [camera, setCamera] = useState('environment'); // 'user' for front camera, 'environment' for back camera
  const qrRef = useRef(null);

  const handleScan = (data) => {
    if (data) {
      // Redirect to the scanned link
      window.location.href = data;
    }
  };

  const handleError = (error) => {
    console.error('Error scanning QR code:', error);
  };

  const switchCamera = () => {
    setCamera((prevCamera) => (prevCamera === 'user' ? 'environment' : 'user'));
  };

  return (
    <div>
      <QrReader
        ref={qrRef}
        delay={300}
        onError={handleError}
        onScan={handleScan}
        style={{ width: '100%' }}
        facingMode={camera}
      />
      <button onClick={switchCamera}>Switch Camera</button>
    </div>
  );
};

export default QRScanner;