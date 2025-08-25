import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import Card from '../../components/Card';

const Settings: React.FC = () => {
  return (
    <div className="row" style={{ alignItems: 'flex-start' }}>
      <div style={{ flex: 1, minWidth: 240 }}>
        <Card title="Settings">
          <div style={{ display: 'grid', gap: 8 }}>
            <Link to="help" className="button">Help / FAQs</Link>
            <Link to="contact" className="button">Contact Us</Link>
            <Link to="feedback" className="button">Feedback</Link>
            <Link to="change-password" className="button">Change Password</Link>
          </div>
        </Card>
      </div>
      <div style={{ flex: 3, minWidth: 300 }}>
        <Outlet />
      </div>
    </div>
  );
};

export default Settings; 