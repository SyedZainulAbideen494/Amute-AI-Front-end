import React, { useState } from 'react';
import QrReader from 'react-qr-scanner';

const QRScanner = () => {
  const [result, setResult] = useState('');

  const handleScan = data => {
    if (data) {
      setResult(data);
    }
  }

  const handleError = err => {
    console.error(err);
  }

  return (
    <div>
      <QrReader
        delay={300}
        onError={handleError}
        onScan={handleScan}
        style={{ width: '100%' }}
      />
      {result && <p>Scanned QR code: {result}</p>}
    </div>
  );
}

export default QRScanner;