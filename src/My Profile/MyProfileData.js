import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './MyProfile.css'; // Import your CSS file for styling

const MyProfileData = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [postCount, setPostCount] = useState(0); // State to store the post count
  const [queues, setQueues] = useState([]); // State to store user's queues
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('Token not found in localStorage');
          return;
        }
        const response = await fetch('http://localhost:8080/api/fetch/user/info', {
          headers: {
            Authorization: token
          }
        });
        if (response.ok) {
          const data = await response.json();
          setUserInfo(data);
          // After fetching user info, fetch post count and queues
          fetchPostCount(data.id);
          fetchUserQueues(data.id);
        } else {
          setError('Failed to fetch user info');
        }
      } catch (error) {
        setError('Error fetching user info: ' + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, []);

  // Function to fetch the post count
  const fetchPostCount = async (userId) => {
    try {
      const response = await fetch(`http://localhost:8080/api/count/posts?userId=${userId}`);
      if (response.ok) {
        const { postCount } = await response.json();
        setPostCount(postCount);
      } else {
        setError('Failed to fetch post count');
      }
    } catch (error) {
      setError('Error fetching post count: ' + error.message);
    }
  };

  // Function to fetch user's queues
  const fetchUserQueues = async (userId) => {
    try {
      const response = await fetch(`http://localhost:8080/api/fetch/queues/${userId}`);
      if (response.ok) {
        const queuesData = await response.json();
        setQueues(queuesData);
      } else {
        setError('Failed to fetch user queues');
      }
    } catch (error) {
      setError('Error fetching user queues: ' + error.message);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <img src={`http://localhost:8080/images/${userInfo.profilePic}`} alt="Profile Pic" className="profile-pic" />
        <div className="profile-info">
          <h2 className="username">{userInfo.name}</h2>
          <p className="bio">{userInfo.email}</p>
        
          <div className="stats">
            <div className="stat">
              <span className="stat-count">{postCount}</span> Queues
            </div>
            <div className="stat">
            </div>
            <div className="user_profile_actions_btns">
          </div>
          </div>
        </div>
      </div>
      {/* Display user's queues */}
      <div className="queues-container_MyProfile">
        <h3 style={{textAlign: 'center'}}>My Queues</h3>
        <ul className="queue-list_MyProfile">
          {queues.map(queue => (
             <Link
             to={`/event/host/admin/${queue.id}`}
             style={{textDecoration: 'none'}}
           >
            <li key={queue.id} className="queue-item_MyProfile">
              <span>{queue.name}</span>
            </li>
            </Link>
          ))}
        </ul>
      </div>
      {/* Add other profile sections (e.g., posts, saved, settings) here */}
    </div>
  );
};

export default MyProfileData;