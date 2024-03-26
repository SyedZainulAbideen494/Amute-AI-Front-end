import React,{useCallback, useEffect, useState} from "react";
import { API_ROUTES } from "../app-modules/api_routes";
import { useNavigate } from "react-router-dom";
import './company.css'

const CompanyCreate = () => {
    const [userInfo, setUserInfo] = useState([]);
    const nav = useNavigate()
    useEffect(() => {
        const token = localStorage.getItem('token');

        if (!token) {
            console.error('Token not found');
            return;
        }

        fetch(API_ROUTES.fetchUserDetails, {
            method: 'GET',
            headers: {
                'Authorization': token
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                console.error('Error fetching user:', data.error);
                return;
            }
            setUserInfo(data);
        })
        .catch(error => {
            console.error('Error fetching user:', error);
        });
    }, []);
    useEffect(() => {
        if (userInfo.role === 'member') {
            nav('/dashboard');
        }
    }, [userInfo.role, nav]);
    return
}

export default CompanyCreate