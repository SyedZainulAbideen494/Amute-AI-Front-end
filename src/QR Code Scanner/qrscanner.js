import React, { useState, useRef } from 'react';
import QrReader from 'react-qr-scanner';

const QRScanner = () => {
  const [result, setResult] = useState('');
  const videoRef = useRef(null);

  const handleScan = (data) => {
    if (data) {
      setResult('data');
    }
  };

  const handleError = (err) => {
    console.error(err);
  };

  const flipCamera = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
    videoRef.current.srcObject = stream;
  };

  return (
    <div>
      <button onClick={flipCamera}>Flip Camera</button>
      <QrReader
        delay={300}
        onError={handleError}
        onScan={handleScan}
        style={{ width: '100%' }}
        videoConstraints={{ facingMode: 'environment' }} // Flip the camera to use the rear-facing camera
        ref={videoRef}
      />
      {result && <p>Scanned QR code: {result}</p>}
    </div>
  );
};

export default QRScanner;