import React, { useRef, useState } from 'react';
import jsQR from 'jsqr';

const CameraScanner = () => {
    const videoRef = useRef(null);
    const [scanning, setScanning] = useState(false);
  
    const startScanning = () => {
      setScanning(true);
      navigator.mediaDevices.getUserMedia({ video: true })
        .then((stream) => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        })
        .catch((error) => {
          console.error('Error accessing camera:', error);
          setScanning(false);
        });
    };
  
    const stopScanning = () => {
      if (videoRef.current && videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach(track => track.stop());
        setScanning(false);
      }
    };
  
    const handleScan = () => {
      const canvas = document.createElement('canvas');
      const video = videoRef.current;
  
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
  
      const imageData = canvas.getContext('2d').getImageData(0, 0, canvas.width, canvas.height);
      const qrCode = jsQR(imageData.data, imageData.width, imageData.height);
  
      if (qrCode) {
        const url = qrCode.data;
        window.location.href = url;
      } else {
        alert('No QR code found!');
      }
    };
  
    return (
      <div>
        {scanning ? (
          <button onClick={stopScanning}>Stop Scanning</button>
        ) : (
          <button onClick={startScanning}>Start Scanning</button>
        )}
  
        <video ref={videoRef} autoPlay playsInline style={{ width: '100%', maxWidth: '500px' }} />
      </div>
    );
  };

export default CameraScanner;