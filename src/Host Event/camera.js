import React, { useRef, useState } from 'react';
import qrReaderRef from 'react-qr-reader';
import './hostEvent.css'; // Import CSS file for styling

const QRScanner = () => {
  const qrReaderRef = useRef(null);
  const [result, setResult] = useState(null);

  const handleScan = (data) => {
    if (data) {
      setResult(data);
    }
  };

  const handleError = (err) => {
    console.error(err);
  };

  return (
    <div className="qr-scanner-container">
      <qrReaderRef
        ref={qrReaderRef}
        delay={300}
        onError={handleError}
        onScan={handleScan}
        style={{ width: '100%', height: '100%' }}
        facingMode="environment" // Use the back camera
      />
      {result && (
        <div className="qr-result-box">
          <p>{result}</p>
        </div>
      )}
    </div>
  );
};

export default QRScanner;