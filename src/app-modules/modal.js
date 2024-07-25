// src/components/Modal.js
import React from 'react';
import './modal.css'; // Import your modal CSS

const Modal = ({ isOpen, message, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Success</h2>
                <p>{message}</p>
                <button className="modal-close" onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default Modal;
