import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './MyProfile.css'; // Import your CSS file for styling
import ProfilePicUpload from './EditMyProfile';

const MyProfileData = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [postCount, setPostCount] = useState(0);
  const [queues, setQueues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showUpload, setShowUpload] = useState(false); // State to manage the visibility of upload component

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

  const fetchPostCount = async (userId) => {
    // Fetch post count similar to your implementation
  };

  const fetchUserQueues = async (userId) => {
    // Fetch user queues similar to your implementation
  };

  const handleProfilePicClick = () => {
    setShowUpload(!showUpload); // Set showUpload to true when profile pic is clicked
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="profile-container">
      {showUpload && <ProfilePicUpload onClose={() => setShowUpload(false)} />} {/* Render ProfilePicUpload component if showUpload is true */}
      <div className="profile-header">
        <img src={`http://localhost:8080/images/${userInfo.profilePic}`} alt="Profile Pic" className="profile-pic" onClick={handleProfilePicClick} style={{cursor: 'pointer'}} />
        <div className="profile-info">
          <h2 className="username">{userInfo.name}</h2>
          <p className="bio">{userInfo.email}</p>
          <div className="stats">
            <div className="stat">
              <span className="stat-count">{postCount}</span> Queues
            </div>
          </div>
        </div>
      </div>
      <div className="queues-container_MyProfile">
        <h3 style={{textAlign: 'center'}}>My Queues</h3>
        <ul className="queue-list_MyProfile">
          {queues.map(queue => (
            <Link to={`/event/host/admin/${queue.id}`} style={{textDecoration: 'none'}} key={queue.id}>
              <li className="queue-item_MyProfile">
                <span>{queue.name}</span>
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MyProfileData;