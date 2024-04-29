import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import QRCode from 'qrcode.react';
import './hostEvent.css'; // Import your CSS file

const QuickShare = ({ joinQueueURL }) => {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Join the queue',
          text: `Join the queue with this link: ${joinQueueURL}`,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      // Fallback for browsers that don't support Web Share API
      const shareText = `Join the queue with this link: ${joinQueueURL}`;
      const shareURL = `whatsapp://send?text=${encodeURIComponent(shareText)}`;
      window.location.href = shareURL;
    }
  };

  return (
    <div className="quick-share-container">
      <button className="quick-share-button" onClick={handleShare}>Share</button>
    </div>
  );
};

const EventDetailsData = () => {
  const [eventDetails, setEventDetails] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const nav = useNavigate();

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

  useEffect(() => {
    // Fetch event details using the ID from the URL
    const fetchEventDetails = async () => {
      try {
        const response = await fetch(`http://localhost:8080/get/event/${id}`);
        if (response.ok) {
          const eventData = await response.json();
          setEventDetails(eventData);
        } else {
          console.error('Failed to fetch event details');
        }
      } catch (error) {
        console.error('Error fetching event details:', error);
      }
    };

    fetchEventDetails();
  }, [id]);

  // Function to handle QR code scan
  const handleQRScan = (data) => {
    // Check if the scanned data is a join queue link
    if (isJoinQueueLink(data)) {
      // Redirect to the join queue link
      window.location.href = data;
    }
  };

  // Function to check if the data is a join queue link
  const isJoinQueueLink = (data) => {
    // Simple check to see if the data starts with 'http://localhost:3000/join/event/'
    return data.startsWith('http://localhost:3000/join/event/');
  };

  // Check if user_id of the event matches the id of the user
  useEffect(() => {
    if (userInfo && eventDetails && userInfo.id != eventDetails.user_id) {
      // Redirect to dashboard if user_id does not match
      nav('/dashboard');
    }
  }, [userInfo, eventDetails, nav]);

  return (
    <div className="event-details-container">
      {eventDetails && (
        <div>
          <div className="event-details">
            <div className="qr-code-container">
              <QRCode value={`http://localhost:3000/join/event/${eventDetails.id}`} onScan={handleQRScan} />
            </div>
            <p><span className="detail-label">Name:</span> {eventDetails.name}</p>
            <p><span className="detail-label">Start Time:</span> {eventDetails.startTime}</p>
            <p><span className="detail-label">End Time:</span> {eventDetails.endTime}</p>
            <p><span className="detail-label">Date:</span> {eventDetails.date}</p>
            <p><span className="detail-label">Forever:</span> {eventDetails.isForever ? 'Yes' : 'No'}</p>
            <QuickShare joinQueueURL={`http://localhost:3000/join/event/${eventDetails.id}`} />
          </div>
        </div>
      )}
    </div>
  );
};

export default EventDetailsData;