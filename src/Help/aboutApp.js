import React from 'react';
import './help.css'; // Import the same CSS file used for Terms and Conditions

const AppDetails = () => {
    return (
        <div className="terms-container">
            <h1>About Amute</h1>
            
            <h2>1. Introduction</h2>
            <p>
                Amute is a revolutionary platform designed to address the challenges associated with waiting in queues. Our app provides a seamless solution for both hosts and attendees of events.
            </p>
            
            <h2>2. Purpose</h2>
            <p>
                The primary purpose of Amute is to simplify the process of organizing and participating in events. By allowing hosts to create queues and attendees to join them, we eliminate the need for traditional waiting lines and provide a more efficient and convenient experience for everyone involved.
            </p>
            
            <h2>3. Features</h2>
            <p>
                Amute offers a wide range of features to enhance the event management process. From creating queues and generating QR codes to scanning codes and receiving notifications, our platform is designed to streamline every aspect of event organization.
            </p>

            <h2>4. Benefits</h2>
            <p>
                With Amute, hosts can effortlessly manage their events and ensure a smooth and organized experience for their attendees. Meanwhile, attendees can easily reserve their spot in the queue and receive timely updates and notifications, allowing them to make the most of their time.
            </p>

            {/* Add more sections for additional details about the app */}
        </div>
    );
}

export default AppDetails;