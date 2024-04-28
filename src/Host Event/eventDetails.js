import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode.react';
import { useParams } from 'react-router-dom';
import './hostEvent.css'

const QuickShare = ({ status }) => {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Join the queue',
          text: `Add me to the team with this code: ${status}`,
        });
      } catch (error) {
        console.error('Error sharing status code:', error);
      }
    } else {
      // Fallback for browsers that don't support Web Share API
      const shareText = `Join my team with this status code: ${status}`;
      const shareURL = `whatsapp://send?text=${encodeURIComponent(shareText)}`;
      window.location.href = shareURL;
    }
  };

  return (
      <div className="quick-share-container">
      <button className="quick-share-button" onClick={handleShare}>{status} Share</button>
    </div>
  );
};

const EventDetails = () => {
  const [eventDetails, setEventDetails] = useState(null);
  const { id } = useParams();

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

  return (
    <div className="event-details-container">
    {eventDetails && (
      <div>
        {/* Display event details */}
        <h2>Event Details</h2>
        <p>Name: {eventDetails.name}</p>
        <p>Start Time: {eventDetails.startTime}</p>
        <p>End Time: {eventDetails.endTime}</p>
        <p>Date: {eventDetails.date}</p>
        <p>Forever: {eventDetails.isForever ? 'Yes' : 'No'}</p>
        {/* Generate QR code for event details */}
        <div className="qr-code-container">
          <QRCode value={`http://localhost:3000/join/event/${eventDetails.id}`} onScan={handleQRScan} />
        </div>
        {/* Quick share link */}
        <p className="quick-share-link">Quick Share: <a href={`http://localhost:3000/join/event/${eventDetails.id}`}>Join Event</a></p>
        <QuickShare/>
      </div>
    )}
  </div>
  );
};

export default EventDetails;