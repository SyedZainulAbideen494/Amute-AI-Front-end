import React from 'react';
import './SuccessModal.css';

const SuccessModal = ({ onClose }) => {
  return (
    <div className="modal-overlays" onClick={onClose}>
      <div className="modal-contents">
        <div className="tick-circle">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path fill="none" d="M0 0h24v24H0z"/>
            <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/>
          </svg>
        </div>
        <div className="success-text">
          Member added successfully!
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;