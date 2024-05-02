import React,{Fragment, useCallback, useEffect} from "react";
import './website.css'
import { useNavigate } from "react-router-dom";

const Website = () => {
    const navigate = useNavigate();

    useEffect(() => {
      const token = localStorage.getItem('token');
      if (token) {
        // Token is present, redirect to '/dashboard'
        navigate('/dashboard');
      }else {
        navigate('/dashboard')
      }
      // If token is not present, do nothing
    }, [navigate]); // Ensure to include navigate in the dependency array
    return<Fragment>
      
    </Fragment>
}

export default Website;