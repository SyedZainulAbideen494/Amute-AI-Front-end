import React from "react";
import "./member.css"; // Add your CSS for the success modal styling

const SuccessModal = ({ message, onClose }) => {
    return (
        <div className="success-modal-overlay">
            <div className="success-modal-content">
                <h2>Success</h2>
                <p>{message}</p>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default SuccessModal;