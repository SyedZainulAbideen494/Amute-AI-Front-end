import React, { useEffect } from "react";
import axios from 'axios';
import { API_ROUTES } from "../app-modules/api_routes";

const UserActivityTracker = () => {
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            console.error('Token not found');
            return;
        }

        // Send a request to indicate user activity
        axios.post(API_ROUTES.userActiveStatus, { token })
            .then(response => {
                console.log('User activity updated successfully');
            })
            .catch(error => {
                console.error('Error updating user activity:', error);
            });
    }, []);

    return null; // This component doesn't render anything visible
}

export default UserActivityTracker;