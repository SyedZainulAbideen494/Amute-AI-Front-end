import React,{useCallback, useState, useEffect} from "react";
import './home.css'
import { API_ROUTES } from "../app-modules/api_routes";

const NavBarTeam = () => {
    const [userInfo, setUserInfo] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token'); // Fetch token from local storage

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
    return<div>
           <div className="left-sidebar_team">
      <div className="welcome-message_team">Welcome, {userInfo.name}!</div>
      <div className="nav-buttons_team">
        <button className="nav-button_team">Button 1</button>
        <button className="nav-button_team">Button 2</button>
        <button className="nav-button_team">Button 3</button>
        <button className="nav-button_team">Button 4</button>
        <button className="nav-button_team">Button 5</button>
        <button className="nav-button_team">Button 6</button>
        <button className="nav-button_team">Button 7</button>
      </div>
    </div>
    </div>
}

export default NavBarTeam