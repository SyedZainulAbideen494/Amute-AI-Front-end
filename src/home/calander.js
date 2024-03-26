import React, { useState, useEffect } from "react";
import './home.css';

const Calendar = () => {
    const [currentDate, setCurrentDate] = useState(new Date());

    const daysInMonth = (year, month) => {
        return new Date(year, month + 1, 0).getDate();
    };

    const renderCalendarDays = () => {
        const totalDays = daysInMonth(currentDate.getFullYear(), currentDate.getMonth());
        const calendarDays = [];
        for (let i = 1; i <= totalDays; i++) {
            calendarDays.push(
                <div className={`calendar-day ${i === currentDate.getDate() ? 'live-date' : ''}`} key={i}>
                    {i}
                </div>
            );
        }
        return calendarDays;
    };

    const monthNames = [
        "January", "February", "March", "April", "May", "June", "July",
        "August", "September", "October", "November", "December"
    ];

    const goToPreviousMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
    };

    const goToNextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
    };

    return (
        <div className="calendar">
            <div className="calendar-header">
                <button onClick={goToPreviousMonth}>&lt;</button>
                <h2>{`${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`}</h2> {/* Display month and year */}
                <button onClick={goToNextMonth}>&gt;</button>
            </div>
            <div className="calendar-days">
                {renderCalendarDays()}
            </div>
        </div>
    );
}

export default Calendar;