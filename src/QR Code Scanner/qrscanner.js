import React, { useState, useRef } from 'react';

const QRScanner = () => {
  const videoRef = useRef(null);
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState('');

  const startScanner = () => {
    setScanning(true);
    setResult('');

    navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
      .then(stream => {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      })
      .catch(error => {
        console.error('Error accessing camera:', error);
      });
  };

  const stopScanner = () => {
    setScanning(false);
    const stream = videoRef.current.srcObject;
    if (stream) {
      const tracks = stream.getTracks();
      tracks.forEach(track => track.stop());
    }
  };

  const handleScan = (event) => {
    const code = event.target.value;
    setResult(code);
    stopScanner();
  };

  return (
    <div>
      {!scanning ? (
        <button onClick={startScanner}>Start Scan</button>
      ) : (
        <div>
          <video ref={videoRef} style={{ width: '100%' }} onScan={handleScan}></video>
          <button onClick={stopScanner}>Stop Scan</button>
        </div>
      )}
      {result && <p>Scanned QR code: {result}</p>}
    </div>
  );
};

export default QRScanner;