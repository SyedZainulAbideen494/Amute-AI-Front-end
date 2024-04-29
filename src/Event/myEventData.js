import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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


 
  const QueueDetails = ({ queue, onDelete, onEdit }) => {
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editedQueue, setEditedQueue] = useState({});
    const [showConfirmation, setShowConfirmation] = useState(false);
  
    const handleEditClick = () => {
      // Open the edit modal and populate the input fields with the current data of the queue
      setEditedQueue({ ...queue });
      setShowEditModal(true);
    };
  
    const handleEditSave = async () => {
      try {
        const response = await fetch(`http://localhost:8080/edit/queue/${queue.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(editedQueue),
        });
        if (response.ok) {
          // If the edit operation is successful, close the edit modal
          setShowEditModal(false);
          // Refresh the queues list
          onEdit();
        } else {
          console.error('Failed to edit queue');
        }
      } catch (error) {
        console.error('Error editing queue:', error);
      }
    };
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
      <Link
             to={`/event/host/admin/${queue.id}`}
             style={{textDecoration: 'none'}}
           >
        <p><span className="detail-label">Queue Name:</span> {queue.name}</p>
        </Link>
        <p><span className="detail-label">Start Time:</span> {queue.startTime}</p>
        <p><span className="detail-label">End Time:</span> {queue.endTime}</p>
        <p><span className="detail-label">Date:</span> {queue.date}</p>
      </div>
      <div className="qr-code-container">
        <QRCode value={`http://localhost:8080/join/queue/${queue.id}`} onScan={() => {}} className="qr-code" />
      </div>
      <div className="queue-actions">
        <button className="edit-button" onClick={handleEditClick}>Edit</button>
        <button className="delete-button" onClick={() => setShowDeleteConfirmation(true)}>Delete</button>
        <QuickShare joinQueueURL={`http://localhost:3000/join/event/${queue.id}`} />
      </div>

      {showDeleteConfirmation && (
        <div className="delete-confirmation-modal">
          <div className="delete-confirmation-content">
            <p>Are you sure you want to delete this queue?</p>
            <div className="delete-confirmation-buttons">
              <button onClick={handleDeleteConfirmation} className='delete_quue_modle_btn_cancel' style={{marginRight: '4px'}}>Delete</button>
              <button onClick={() => setShowDeleteConfirmation(false)} className='delete_quue_modle_btn_cancel'>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {showEditModal && (
        <div className="edit-modal">
          <div className="edit-modal-content">
            <h3>Edit Queue</h3>
            <label>
              Name:
              <input type="text" value={editedQueue.name} onChange={e => setEditedQueue({ ...editedQueue, name: e.target.value })} />
            </label>
            <label>
              Start Time:
              <input type="time" value={editedQueue.startTime} onChange={e => setEditedQueue({ ...editedQueue, startTime: e.target.value })} />
            </label>
            <label>
              End Time:
              <input type="time" value={editedQueue.endTime} onChange={e => setEditedQueue({ ...editedQueue, endTime: e.target.value })} />
            </label>
            <label>
              Date:
              <input type="date" value={editedQueue.date} onChange={e => setEditedQueue({ ...editedQueue, date: e.target.value })} />
            </label>
            <div className="edit-modal-buttons">
              <button onClick={handleEditSave} className='delete_quue_modle_btn_cancel'>Save</button>
              <button onClick={() => setShowEditModal(false)} className='delete_quue_modle_btn_cancel'>Cancel</button>
            </div>
          </div>
        </div>
      )}

{showEditModal && (
        <div className="edit-modal">
          <div className="edit-modal-content">
            <h3>Edit Queue</h3>
            <label>
              Name:
              <input type="text" value={editedQueue.name} onChange={e => setEditedQueue({ ...editedQueue, name: e.target.value })} />
            </label><br/>
            <label>
              Start Time:
              <input type="time" value={editedQueue.startTime} onChange={e => setEditedQueue({ ...editedQueue, startTime: e.target.value })} />
            </label><br/>
            <label>
              End Time:
              <input type="time" value={editedQueue.endTime} onChange={e => setEditedQueue({ ...editedQueue, endTime: e.target.value })} />
            </label><br/>
            <label>
              Date:
              <input type="date" value={editedQueue.date} onChange={e => setEditedQueue({ ...editedQueue, date: e.target.value })} />
            </label><br/>
            <div className="edit-modal-buttons">
              <button onClick={handleEditSave} className='delete_quue_modle_btn_cancel'>Save</button>
              <button onClick={() => setShowEditModal(false)} className='delete_quue_modle_btn_cancel'>Cancel</button>
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