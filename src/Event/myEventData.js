import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode.react';
import './event.css'; // Import your CSS file

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
        <button className="delete-button" onClick={handleShare}>Share</button>
    );
  };

const QueueDetails = ({ queue, onDelete }) => {
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleDeleteClick = () => {
    setShowConfirmation(true);
  };

  const handleDeleteConfirmation = async () => {
    try {
      const response = await fetch(`http://localhost:8080/delete/queue/${queue.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        // Refresh the queues list upon successful deletion
        onDelete();
        setShowConfirmation(false); // Hide the delete confirmation modal
      } else {
        console.error('Failed to delete queue');
      }
    } catch (error) {
      console.error('Error deleting queue:', error);
    }
  };

  const handleCancelDelete = () => {
    setShowConfirmation(false);
  };

  const handleQRScan = (data) => {
    // Check if the scanned data is a join queue link
    if (isJoinQueueLink(data)) {
      // Redirect to the join queue link
      window.location.href = data;
    }
  };

  // Function to check if the data is a join queue link
  const isJoinQueueLink = (data) => {
    // Simple check to see if the data starts with 'http://localhost:8080/join/queue/'
    return data.startsWith('http://localhost:8080/join/queue/');
  };

  return (
    <div className="queue-details">
      <div className="queue-details-content">
        <p><span className="detail-label">Queue Name:</span> {queue.name}</p>
        <p><span className="detail-label">Start Time:</span> {queue.startTime}</p>
        <p><span className="detail-label">End Time:</span> {queue.endTime}</p>
        <p><span className="detail-label">Date:</span> {queue.date}</p>
      </div>
      <div className="qr-code-container">
        <QRCode value={`http://localhost:8080/join/queue/${queue.id}`} onScan={handleQRScan} className="qr-code" />
      </div>
      <div className="queue-actions">
        <button className="edit-button">Edit</button>
        <button className="delete-button" onClick={handleDeleteClick}>Delete</button>
        <QuickShare joinQueueURL={`http://localhost:3000/join/event/${queue.id}`} />
      </div>
      {showConfirmation && (
        <div className="delete-confirmation-modal">
          <div className="delete-confirmation-content">
            <p>Are you sure you want to delete this queue?</p>
            <div className="delete-confirmation-buttons">
              <button onClick={handleDeleteConfirmation} className='delete_quue_modle_btn_delete'>Delete</button>
              <button onClick={handleCancelDelete} className='delete_quue_modle_btn_cancel'>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const MyEventsData = () => {
    const [queues, setQueues] = useState([]);
  
    const fetchQueues = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('Token not found in localStorage');
          return;
        }
        const response = await fetch('http://localhost:8080/api/fetch/user/info', {
          headers: {
            Authorization: token
          }
        });
        if (response.ok) {
          const userInfo = await response.json();
          const userId = userInfo.id;
          const queueResponse = await fetch(`http://localhost:8080/api/fetch/queues/${userId}`);
          if (queueResponse.ok) {
            const queuesData = await queueResponse.json();
            setQueues(queuesData);
          } else {
            console.error('Failed to fetch queues');
          }
        } else {
          console.error('Failed to fetch user info');
        }
      } catch (error) {
        console.error('Error fetching queues:', error);
      }
    };
  
    useEffect(() => {
      fetchQueues();
    }, []);
  
    const handleQueueDelete = () => {
      // Refresh the queues list upon deletion
      fetchQueues();
    };
  
    return (
      <div className="hosted-queues-container">
        <h2 className="hosted-queues-heading" style={{textAlign: 'center'}}>Hosted Queues</h2>
        <div className="hosted-queues-list">
          {queues.map(queue => (
            <QueueDetails key={queue.id} queue={queue} onDelete={handleQueueDelete} />
          ))}
        </div>
      </div>
    );
  };
  
  export default MyEventsData;