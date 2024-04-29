import React from 'react';
import './help.css'; // Import your CSS file

const TermsAndConditions = () => {
    return (
        <div className="terms-container">
            <h1>Terms and Conditions</h1>
            
            <h2>1. Introduction</h2>
            <p>
                Welcome to Amute! These terms and conditions outline the rules and regulations for the use of our platform.
            </p>
            
            <h2>2. Acceptance of Terms</h2>
            <p>
                By accessing or using our platform, you agree to be bound by these terms and conditions. If you disagree with any part of these terms and conditions, you must not use our platform.
            </p>
            
            <h2>3. Description of Service</h2>
            <p>
                Amute is a platform designed to solve the problem of waiting in queues. It allows hosts to create queues for events and attendees to join these queues to reserve their spot.
            </p>

            <h2>4. Privacy and Data Usage</h2>
            <p>
                At Amute, we take your privacy and data security seriously. We do not sell your personal data to third parties. All data transmitted through our platform is encrypted to ensure maximum security.
            </p>
            <p>
                However, when you sign up for a queue, your phone number will be shared with the host of the event. This is done for useful purposes such as communication and coordination related to the event.
            </p>

            <h2>5. Limitation of Liability</h2>
            <p>
                Amute shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses, resulting from (a) your access to or use of or inability to access or use the platform; (b) any conduct or content of any third party on the platform.
            </p>

            {/* Add more sections for remaining terms and conditions */}
        </div>
    );
}

export default TermsAndConditions;