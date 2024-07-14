import React from "react";
import "./member.css"; // Add your CSS for the success modal styling

const SuccessModal = ({ message, onClose }) => {
    return (
        <div className="modal-overlay-success">
            <div className="modal-content-success">
                <div className="tick-mark-container">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="48"
                        height="48"
                        className="tick-mark"
                    >
                        <path
                            fill="none"
                            stroke="#4CAF50"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                        />
                    </svg>
                </div>
                <h2>Success</h2>
                <p>{message}</p>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default SuccessModal;