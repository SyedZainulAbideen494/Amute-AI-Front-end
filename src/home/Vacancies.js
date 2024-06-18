import React, { useState, useEffect } from 'react';
import { API_ROUTES } from '../app-modules/api_routes';

const Vacancies = () => {
    const [vacancies, setVacancies] = useState({
        '1 sharing': 0,
        '2 sharing': 0,
        '3 sharing': 0,
        '4 sharing': 0,
    });

    useEffect(() => {
        fetchVacancies();
    }, []);

    const fetchVacancies = async () => {
        try {
            const response = await fetch(API_ROUTES.vacancies);
            const data = await response.json();
            setVacancies(data);
        } catch (error) {
            console.error('Error fetching vacancies:', error);
        }
    };

    const vacancyCardStyle = {
        border: '1px solid #ccc',
        padding: '3px',
        marginBottom: '10px',
        maxHeight: '80px', // Adjust max height as needed
    };

    const vacancyZeroStyle = {
        borderColor: 'red',
        // Additional styles for zero vacancies
    };

    const isVacancyZero = (vacancy) => {
        return vacancy === 0;
    };

    return (
        <div className="vacancies-container" style={{ maxHeight: '440px', overflowY: 'auto' }}>
            <h2>Room Vacancies</h2>
            <div style={isVacancyZero(vacancies['1 sharing']) ? { ...vacancyCardStyle, ...vacancyZeroStyle } : vacancyCardStyle}>
                <h3>1 Sharing</h3>
                <p>Vacancies: {vacancies['1 sharing']}</p>
            </div>
            <div style={isVacancyZero(vacancies['2 sharing']) ? { ...vacancyCardStyle, ...vacancyZeroStyle } : vacancyCardStyle}>
                <h3>2 Sharing</h3>
                <p>Vacancies: {vacancies['2 sharing']}</p>
            </div>
            <div style={isVacancyZero(vacancies['3 sharing']) ? { ...vacancyCardStyle, ...vacancyZeroStyle } : vacancyCardStyle}>
                <h3>3 Sharing</h3>
                <p>Vacancies: {vacancies['3 sharing']}</p>
            </div>
            <div style={isVacancyZero(vacancies['4 sharing']) ? { ...vacancyCardStyle, ...vacancyZeroStyle } : vacancyCardStyle}>
                <h3>4 Sharing</h3>
                <p>Vacancies: {vacancies['4 sharing']}</p>
            </div>
        </div>
    );
};

export default Vacancies;