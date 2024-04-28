import React, { useRef, useState } from 'react';

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
     
      {result && (
        <div className="qr-result-box">
          <p>{result}</p>
        </div>
      )}
    </div>
  );
};

export default QRScanner;