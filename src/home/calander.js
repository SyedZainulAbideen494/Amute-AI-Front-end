import React, { useState } from 'react';
import CalendarModal from './CalendarModal'; // Adjust path based on your project structure
import { API_ROUTES } from '../app-modules/api_routes';

const CalendarComponent = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState([]);

  const handleMonthClick = async (index) => {
    setCurrentMonth(index);

    try {
      const response = await fetch(`${API_ROUTES.calanderFetch}/${new Date().getFullYear()}/${index + 1}`);
      const data = await response.json();
      setModalData(data);
      setModalOpen(true);
    } catch (error) {
      console.error('Error fetching data:', error);
      // Handle error
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  return (
    <div className="calendar-container">
      <h3>Calendar {new Date().getFullYear()}</h3>
      <div className="calendar">
        {months.map((month, index) => (
          <div
            key={index}
            className={`month ${index === currentMonth ? 'current' : ''}`}
            onClick={() => handleMonthClick(index)}
          >
            {month}
          </div>
        ))}
      </div>

      <CalendarModal
        isOpen={modalOpen}
        onClose={handleCloseModal}
        data={modalData}
        currentMonth={currentMonth}
      />
    </div>
  );
};

export default CalendarComponent;