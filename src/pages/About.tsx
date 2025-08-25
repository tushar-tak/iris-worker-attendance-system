import React from 'react';
import Card from '../components/Card';

const About: React.FC = () => {
  return (
    <div className="row">
      <div style={{ width: '100%' }}>
        <Card title="About the IIRS Attendance System">
          <p>
            This portal supports MNREGA supervisors in securely marking attendance for workers using
            simulated ID and IIRS data verification.
          </p>
          <div className="section-title">Process</div>
          <ol>
            <li>Admin Login</li>
            <li>Select Current Team</li>
            <li>Scan/Enter Worker ID and IIRS data</li>
            <li>Verify Match (simulated)</li>
            <li>Confirm Attendance</li>
          </ol>
          <div className="section-title">Notes</div>
          <ul>
            <li>All verification calls are placeholders for future backend integration.</li>
            <li>Use of Aadhaar/PAN IDs should follow data protection guidelines.</li>
            <li>IIRS biometric matching will be integrated with secure APIs later.</li>
          </ul>
        </Card>
      </div>
    </div>
  );
};

export default About; 