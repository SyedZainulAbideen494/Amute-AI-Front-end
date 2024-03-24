import React from 'react';
import './successauth.css'; // Your CSS file for styling

const LoginPageSuccess = () => {
  return (
    <div className="login-seccess-main-div">
      <h1 className="big-texlogin-seccess-main-divt">You have logged in successfully!</h1>
      <button className="buttonlogin-seccess-main-div" onClick={() => window.location.href = '/home'}>
        Go to Home
      </button>
    </div>
  );
};

export default LoginPageSuccess;