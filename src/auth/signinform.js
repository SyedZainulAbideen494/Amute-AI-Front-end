import { Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import "./auth.css";
import Axios from "axios";

const Signinform = () => {
  const [phoneno, setphoneno] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [Name, setname] = useState("");
  const [Position, setpostion] = useState("");
  const [age, setage] = useState("");
  const [gender, setGender] = useState(""); // State for gender
  const [error, setError] = useState("")
  const nameHandler = (event) => {
    setname(event.target.value);
  };
  const genderHandler = (event) => {
    setGender(event.target.value); // Update gender based on selected option
  };

  const emailHandler = (event) => {
    setemail(event.target.value);
  };

  const passwordHandler = (event) => {
    setpassword(event.target.value);
  };

  const phoneNohandler = (event) => {
    setphoneno(event.target.value);
  };

  const PositionHandler = (event) => {
    setpostion(event.target.value);
  };


  const nav = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission

    // Check if required fields are empty
    if (
      !Name ||
      !email ||
      !password ||
      !Position ||
      !phoneno ||
      !gender
    ) {
      console.log("Please fill in all fields");
      return; // Don't proceed if any required field is empty
    }

    const userData = {
      Name: Name,
      email: email,
      password: password,
      Position: Position,
      phoneno: phoneno,
      gender: gender
    };

    try {
      const response = await Axios.post("http://localhost:8080/addUser", userData);

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
         
        <div className="input-container-gender">
      <label htmlFor="gender">Gender</label><br/>
      <select
        id="gender"
        name="gender"
        value={gender}
        onChange={genderHandler}
        required
        className="select-input-gender"
      >
        <option value="">Select Gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>
    </div>
          <div className="inp">
            <label htmlFor="fname">Name</label>
            <br />
            <input
              type="text"
              id="fname"
              name="fname"
              value={Name}
              onChange={nameHandler}
              placeholder="Enter Name"
              required
            />
          </div>
          <div className="inp">
            <label htmlFor="email">Email</label>
            <br />
            <input
              type="email"
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
          <div className="inp">
            <label htmlFor="phoneno">Phone No</label>
            <br />
            <input
              type="text"
              id="phoneno"
              name="phoneno"
              value={phoneno}
              onChange={phoneNohandler}
              placeholder="Enter Phone No"
              required
            />
          </div>
          <div className="inp">
            <label htmlFor="occupation">Position</label>
            <br />
            <input
              type="text"
              id="occupation"
              name="occupation"
              value={Position}
              onChange={PositionHandler}
              placeholder="Enter Occupation"
              required
            />
          </div>
          </div>
        <div className="submit-btn">
          <button type="submit" className="btn btn-primary">
            Sign Up
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