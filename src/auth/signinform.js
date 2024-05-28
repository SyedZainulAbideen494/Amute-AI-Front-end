import { Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import "./auth.css";
import Axios from "axios";
import { API_ROUTES } from "../app-modules/api_routes";

const Signinform = () => {
  const [phone_no, setphone_no] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [Name, setname] = useState("");
  const [error, setError] = useState("")
  const nameHandler = (event) => {
    setname(event.target.value);
  };

  const emailHandler = (event) => {
    setemail(event.target.value);
  };

  const passwordHandler = (event) => {
    setpassword(event.target.value);
  };

  const phone_nohandler = (event) => {
    setphone_no(event.target.value);
  };



  const nav = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission

    // Check if required fields are empty
    if (
      !email ||
      !password 
    ) {
      console.log("Please fill in all fields");
      return; // Don't proceed if any required field is empty
    }

    const userData = {
      email: email,
      password: password
    };

    try {
      const response = await Axios.post(API_ROUTES.signup, userData);

      if (response.status === 200) {
        nav('/login');
      } else {
        console.log("User registration failed with status:", response.status);
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setError("User with this email already exists"); // Set error message
      } else {
        console.error("User registration failed:", error);
      }
    }
  };
  return (
    <Fragment>
      <form className="signup_form" onSubmit={handleSubmit}>
        <h2 className="sign-heading">Sign Up</h2>
        <div className="signup_info">
          <div className="inp">
            <label htmlFor="email">Email</label>
            <br />
            <input
              type="text"
              id="email"
              name="email"
              value={email}
              onChange={emailHandler}
              placeholder="Enter Email"
              required
            />
          </div>
          <div className="inp">
            <label htmlFor="password">Password</label>
            <br />
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={passwordHandler}
              placeholder="Enter Password"
              required
            />
          </div>
          </div>
        <div className="submit-btn">
          <button type="submit" className="btn btn-primary">
            Sign Up
          </button>
          <button className="btn btn-primary">
            Cancel
          </button>
        </div>
        <div className="already">
          <p>
            Already have an account? <Link to="/login">Log In</Link>
          </p>
        </div>
        {error && (
        <div className="error-container">
          <p className="error-msg">{error}</p>
        </div>
      )}
      </form>
    </Fragment>
  );
};

export default Signinform;