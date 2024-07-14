import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { API_ROUTES } from "../app-modules/api_routes";
import AddStatementForm from "./addstatementform";
import './statements.css'

const Statements = () => {
    const [statements, setStatements] = useState([]);

    useEffect(() => {
        fetchStatements();
    }, []);

    const fetchStatements = async () => {
        try {
            const response = await axios.get(API_ROUTES.fetchStatements);
            setStatements(response.data);
        } catch (error) {
            console.error("Error fetching statements:", error);
        }
    };

    const renderStatementCards = (type) => {
        const filteredStatements = statements.filter(
            (statement) => statement.type === type
        );
        return (
            <div className="statement-cards">
                {filteredStatements.map((statement) => (
                    <div key={statement.id} className="statement-card">
                        <p>Name: {statement.name}</p>
                        <p>Amount: {statement.amount}</p>
                        {statement.paymentType === "online" && (
                            <p>Transaction ID: {statement.transactionId}</p>
                        )}
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div className="dashboard-team-container">
            <nav className="left-navbar">
                <h3>Dashboard</h3>
                <ul>
                    <li><Link to="/">Dashboard</Link></li>
                    <li><Link to="/members">Members</Link></li>
                    <li><Link to="/statements">Statements</Link></li>
                    <li><Link to="/add-members">Add Members</Link></li>
                </ul>
            </nav>
            <div className="main-statements">
                <AddStatementForm onUpdateStatements={fetchStatements} />
                <h2>All Statements</h2>
                <div style={{ display: "flex", gap: "20px" }}>
                    <div style={{ width: "50%" }}>
                        <h3>Advance Payments</h3>
                        {renderStatementCards("advance_payment")}
                    </div>
                    <div style={{ width: "50%" }}>
                        <h3>Rent</h3>
                        {renderStatementCards("rent")}
                    </div>
                </div>
                <div style={{ display: "flex", gap: "20px" }}>
                    <div style={{ width: "50%" }}>
                        <h3>Others</h3>
                        {renderStatementCards("other")}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Statements;