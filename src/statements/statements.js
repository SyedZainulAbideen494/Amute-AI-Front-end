import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { API_ROUTES } from "../app-modules/api_routes";
import AddStatementForm from "./addstatementform";
import "./statements.css";

const Statements = () => {
  const [statements, setStatements] = useState([]);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const handleViewPhoto = (photoLink) => {
    window.open(`${API_ROUTES.displayImages}/${photoLink}`, "_blank"); // Open photo link in a new tab
  };

  const closeModal = () => {
    setSelectedPhoto(null);
    setIsModalOpen(false);
  };

  const formatDate = (dateTimeString) => {
    const dateTime = new Date(dateTimeString);
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
    };
    return dateTime.toLocaleDateString('en-US', options);
};


  return (
    <div className="dashboard-team-container">
      <nav className="left-navbar">
        <h3>Dashboard</h3>
        <ul>
          <li>
            <Link to="/">Dashboard</Link>
          </li>
          <li>
            <Link to="/members">Members</Link>
          </li>
          <li>
            <Link to="/statements">Statements</Link>
          </li>
          <li>
            <Link to="/add-members">Add Members</Link>
          </li>
        </ul>
      </nav>
      <div className="main-statements">
        <AddStatementForm onUpdateStatements={fetchStatements} />
        <h2>All Statements</h2>
        <table className="statement-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Amount</th>
              <th>Transaction ID</th>
              <th>Cash Amount</th>
              <th>Type</th>
              <th>Date, time</th>
              <th>View Photo</th>
            </tr>
          </thead>
          <tbody>
            {statements.map((statement) => (
              <tr key={statement.id}>
                <td>{statement.name}</td>
                <td>{statement.amount}</td>
                <td>
                  {statement.paymentType === "online"
                    ? statement.transactionId
                    : "N/A"}
                </td>
                <td>
                  {statement.paymentType === "cash"
                    ? statement.amount
                    : "N/A"}
                </td>
                <td>{statement.type}</td>
                <td>{formatDate(statement.created_at)}</td>
                <td>
                  {statement.photo && (
                    <button
                      className="button_update_member"
                      onClick={() => handleViewPhoto(statement.photo)}
                    >
                      View
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for displaying photo */}
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <img src={`${API_ROUTES.displayImages}/${selectedPhoto}`} alt="Statement Photo" className="image-statements"/>
          </div>
        </div>
      )}
    </div>
  );
};

export default Statements;