import React, { useState, useEffect } from 'react';
import './home.css'; // Import the CSS file for styling

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
            const response = await fetch('http://localhost:8080/api/vacancies'); // Fetch vacancies from your API endpoint
            const data = await response.json();
            setVacancies(data);
        } catch (error) {
            console.error('Error fetching vacancies:', error);
        }
    };

    return (
        <div className="vacancies-container">
            <h2>Room Vacancies</h2>
            <div className="vacancy-card">
                <h3>1 Sharing</h3>
                <p>Vacancies: {vacancies['1 sharing']}</p>
            </div>
            <div className="vacancy-card">
                <h3>2 Sharing</h3>
                <p>Vacancies: {vacancies['2 sharing']}</p>
            </div>
            <div className="vacancy-card">
                <h3>3 Sharing</h3>
                <p>Vacancies: {vacancies['3 sharing']}</p>
            </div>
            <div className="vacancy-card">
                <h3>4 Sharing</h3>
                <p>Vacancies: {vacancies['4 sharing']}</p>
            </div>
        </div>
    );
};

export default Vacancies;