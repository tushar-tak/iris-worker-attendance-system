import React from 'react';
import Card from '../components/Card';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import TiltCard from '../components/TiltCard';

const Stat: React.FC<{ label: string; value: string | number }>=({ label, value }) => (
  <div style={{ flex: 1, minWidth: 240, position: 'relative' }}>
    <TiltCard>
      <div style={{ position: 'relative' }}>
        <Card>
          <div className="small" style={{ color: 'var(--muted-text)' }}>{label}</div>
          <div style={{ fontSize: 32, fontWeight: 800 }}>{value}</div>
        </Card>
      </div>
    </TiltCard>
  </div>
);

const Home: React.FC = () => {
  const { admin } = useAuth();

  return (
    <div className="row">
      <div style={{ width: '100%' }}>
        <div style={{
          background: 'linear-gradient(135deg, #e6f0fb 0%, #ffffff 60%)',
          border: '1px solid var(--card-border)',
          borderRadius: 12,
          boxShadow: 'var(--shadow)',
          padding: 20,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 12,
          flexWrap: 'wrap'
        }}>
          <div>
            <div style={{ fontWeight: 900, fontSize: 22, color: 'var(--accent-blue-600)' }}>Welcome, {admin?.name || 'Admin'}</div>
            <div className="small">Role: {admin?.role} • IIRS Attendance System</div>
          </div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <Link to="/teams" className="button">Go to Current Team</Link>
            <Link to="/new-work" className="button">Create New Work</Link>
          </div>
        </div>
      </div>

      <Stat label="Teams Active" value={2} />
      <Stat label="Workers Present Today" value={0} />
      <Stat label="Pending Verifications" value={3} />

      <div style={{ width: '100%' }}>
        <TiltCard>
          <div style={{ position: 'relative' }}>
            <Card title="Quick Actions">
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                <Link to="/teams" className="button">View Current Team</Link>
                <Link to="/new-work" className="button">Add New Work</Link>
                <Link to="/about" className="button">About</Link>
                <Link to="/settings" className="button">Settings</Link>
              </div>
            </Card>
          </div>
        </TiltCard>
      </div>
    </div>
  );
};

export default Home; 