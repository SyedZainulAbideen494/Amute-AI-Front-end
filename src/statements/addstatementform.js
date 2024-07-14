import React, { useState } from "react";
import axios from "axios";
import { API_ROUTES } from "../app-modules/api_routes";
import "./statements.css"; // Import your CSS file for styling

const AddStatementForm = ({ onUpdateStatements }) => {
    const [name, setName] = useState("");
    const [paymentType, setPaymentType] = useState("cash");
    const [transactionId, setTransactionId] = useState("");
    const [amount, setAmount] = useState("");
    const [type, setType] = useState("advance_payment");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(API_ROUTES.addStatements, {
                name,
                paymentType,
                transactionId: paymentType === "cash" ? "" : transactionId,
                amount,
                type,
            });
            onUpdateStatements(); // Update statements after successful addition
            // Clear form fields after submission
            setName("");
            setPaymentType("cash");
            setTransactionId("");
            setAmount("");
            setType("advance_payment");
        } catch (error) {
            console.error("Error adding statement:", error);
        }
    };

    return (
        <div className="main-content">
            <form className="add-statement-form" onSubmit={handleSubmit}>
                <label className="form-label">
                    Name:
                    <input
                        className="form-input"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </label>
                <label className="form-label">
                    Payment Type:
                    <select
                        className="form-input"
                        value={paymentType}
                        onChange={(e) => setPaymentType(e.target.value)}
                        required
                    >
                        <option value="cash">Cash</option>
                        <option value="online">Online</option>
                    </select>
                </label>
                {paymentType === "online" && (
                    <label className="form-label">
                        Transaction ID:
                        <input
                            className="form-input"
                            type="text"
                            value={transactionId}
                            onChange={(e) => setTransactionId(e.target.value)}
                            required
                        />
                    </label>
                )}
                <label className="form-label">
                    Amount:
                    <input
                        className="form-input"
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        required
                    />
                </label>
                <label className="form-label">
                    Type:
                    <select
                        className="form-input"
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        required
                    >
                        <option value="advance_payment">Advance Payment</option>
                        <option value="rent">Rent</option>
                        <option value="other">Other</option>
                    </select>
                </label>
                <button className="form-button" type="submit">Add Statement</button>
            </form>
        </div>
    );
};

export default AddStatementForm;