import React from 'react';
import Modal from 'react-modal';
import './home.css'; // Import your CSS file

const CalendarModal = ({ isOpen, onClose, data, currentMonth }) => {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  if (!data || Object.keys(data).length === 0) {
    return (
      <Modal isOpen={isOpen} onRequestClose={onClose} className="calendar-modal">
        <div className="modal-content-calendar-fallback">
          <h2>{months[currentMonth]} {new Date().getFullYear()}</h2>
          <p>No data available for this month.</p>
        </div>
      </Modal>
    );
  }

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} className="calendar-modal">
      <div className="modal-content-calendar">
        <h2>{months[currentMonth]} {new Date().getFullYear()}</h2>

        <div className="joining-list">
          <h3>Joining this month:</h3>
          {data.joining.map((entry, idx) => (
            <p key={idx}>{entry.member_name} joining on {new Date(entry.date_join).toLocaleDateString()}</p>
          ))}
        </div>

        <div className="leaving-list">
          <h3>Leaving this month:</h3>
          {data.leaving.map((entry, idx) => (
            <p key={idx}>{entry.member_name} vacating on {entry.date_vacating ? new Date(entry.date_vacating).toLocaleDateString() : 'unknown'}</p>
          ))}
        </div>
      </div>
    </Modal>
  );
};

export default CalendarModal;