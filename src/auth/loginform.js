import { Link, useNavigate } from "react-router-dom";
import React, { Fragment, useEffect, useRef, useState } from "react";
import "./login.css";
import Axios from "axios";
const Loginform = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [loginstatus, setloginstatus] = useState(false);
  const [error, setError] = useState("")

  const navigate = useNavigate();

  const userauthentication = () => {
    Axios.get("http://localhost:8080/userAuth", {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    }).then((response) => {
      console.log(response);
    });
  };

  const login = () => {
    setError(""); // Clear any previous errors
    Axios.post("http://localhost:8080/login", {
      email: email,
      password: password,
    }).then((response) => {
      if (!response.data.auth) {
        setError(response.data.message || "An error occurred"); // Display the error message from the server, or a generic error message
      } else {
        navigate("/");
        localStorage.setItem("token", response.data.token);
      }
    }).catch((error) => {
      setError("An error occurred while logging in"); // Display generic error message for network or other errors
    });
  };

  const userAuth = () => {
    Axios.get("http://localhost:8080/isUserAuth");
  };

  return (
    <Fragment>
      <div className="loginform">
        <div className="emailinp">
          <label>
            <h3>Email</h3>
          </label>
          <br />
          <input
            type="email"
            required
            placeholder="email"
            onChange={(e) => {
              setemail(e.target.value);
            }}
          />
        </div>
        <div className="password">
          <label>
            <h3>Password</h3>
          </label>
          <br />
          <input
            type="password"
            required
            placeholder="password"
            onChange={(e) => {
              setpassword(e.target.value);
            }}
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <div className="btnloginform">
          <span>
            <Link to="/">
            </Link>
          </span>
          <span className="loginbtn">
            <button onClick={login} style={{cursor: 'pointer'}}>Login</button>
          </span>
          <span className="loginbtn">
            <Link to='/website'>
            <button>Cancel</button>
            </Link>
          </span>
        </div>
        <div className="logintt">
          <Link to='/forgot-password'>
        <p style={{color: 'white'}}>Forgot password</p>
        </Link>
          <p style={{color: 'white'}}>Don't have an account?</p>
          <div className="loginct">
            <Link to="/signin">
              <p style={{color: 'white'}}>Sign up</p>
            </Link>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Loginform;
