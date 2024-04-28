import React, { useRef, useState } from 'react';

const CameraScanner = () => {
  const videoRef = useRef(null);
  const [scannedData, setScannedData] = useState('');

  const startCamera = () => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch((error) => {
        console.error('Error accessing camera:', error);
      });
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      videoRef.current.srcObject.getTracks().forEach(track => track.stop());
    }
  };

  const handleScan = () => {
    const canvas = document.createElement('canvas');
    const video = videoRef.current;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);

    const imageData = canvas.toDataURL('image/png');
    // Process the captured image data (e.g., use a QR code scanning library)

    setScannedData('Scanned QR code data');
  };

  return (
    <div>
      <button onClick={startCamera}>Start Camera</button>
      <button onClick={stopCamera}>Stop Camera</button>
      <button onClick={handleScan}>Scan</button>

      <video ref={videoRef} autoPlay playsInline muted style={{ width: '100%', maxWidth: '500px' }} />
      
      <p>Scanned QR code: {scannedData}</p>
    </div>
  );
};

export default CameraScanner;