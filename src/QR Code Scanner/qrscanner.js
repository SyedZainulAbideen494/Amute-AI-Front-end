import React, { useState } from 'react';
import useQrReader from 'react-qr-reader';

const QRScanner = () => {
  const [result, setResult] = useState('');

  const handleScan = data => {
    if (data) {
      setResult(data);
    }
  }

  const handleError = err => {
    
  }

  const handleRedirect = () => {
    if (result) {
      window.location.href = result; // Redirect to the scanned QR code's link
    }
  }

  return (
    <div>
      <useQrReader
        delay={300}
        onError={handleError}
        onScan={handleScan}
        style={{ width: '100%' }}
      />
      <button onClick={handleRedirect}>Go to Link</button>
    </div>
  );
}

export default QRScanner;