import { Fragment, useState } from "react";
import { Router, Link } from "react-router-dom";
import Loginform from "./loginform";
import "./auth.css";

const Login = () => {
  return (
    <Fragment>
      <div>
        <Loginform />
      </div>
    </Fragment>
  );
};

export default Login;
