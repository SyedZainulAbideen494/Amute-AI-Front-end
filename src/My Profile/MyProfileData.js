import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './MyProfile.css';
import ProfilePicUpload from './EditMyProfile';

const MyProfileData = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [postCount, setPostCount] = useState(0);
  const [queues, setQueues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showUpload, setShowUpload] = useState(false);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('Token not found in localStorage');
          return;
        }
        const response = await fetch('https://ba90-122-172-80-187.ngrok-free.app/api/fetch/user/info', {
          headers: {
            Authorization: token
          }
        });
        if (response.ok) {
          const data = await response.json();
          setUserInfo(data);
          fetchPostCount(data.id); // Fetch post count after getting user info
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
    try {
      const response = await fetch(`https://ba90-122-172-80-187.ngrok-free.app/api/count/posts?userId=${userId}`);
      if (response.ok) {
        const data = await response.json();
        setPostCount(data.postCount);
      } else {
        setError('Failed to fetch post count');
      }
    } catch (error) {
      setError('Error fetching post count: ' + error.message);
    }
  };

  const fetchUserQueues = async (userId) => {
    try {
      const response = await fetch(`https://ba90-122-172-80-187.ngrok-free.app/api/fetch/queues/${userId}`);
      if (response.ok) {
        const data = await response.json();
        setQueues(data); // Update queues state with fetched data
      } else {
        setError('Failed to fetch user queues');
      }
    } catch (error) {
      setError('Error fetching user queues: ' + error.message);
    }
  };

  const handleProfilePicClick = () => {
    setShowUpload(!showUpload);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="profile-container">
      {showUpload && <ProfilePicUpload onClose={() => setShowUpload(false)} />}
      <div className="profile-header">
        <img src={`https://ba90-122-172-80-187.ngrok-free.app/images/${userInfo.profilePic}`} alt="Profile Pic" className="profile-pic" onClick={handleProfilePicClick} style={{cursor: 'pointer'}} />
        <div className="profile-info">
          <h2 className="username">{userInfo.phone_no}</h2>
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