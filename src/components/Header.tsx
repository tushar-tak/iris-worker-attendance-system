import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
  const { admin, logout } = useAuth();
  const navigate = useNavigate();

  const onLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header style={{ background: 'var(--card-bg)', borderBottom: '1px solid var(--card-border)', boxShadow: 'var(--shadow)' }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 12 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
          <div style={{ fontWeight: 800, color: 'var(--accent-blue-600)', fontSize: 20 }}>IIRS Attendance System</div>
          <div className="small">MNREGA Worker Portal</div>
        </div>
        {admin ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div className="small" style={{ textAlign: 'right' }}>
              <div style={{ fontWeight: 700 }}>{admin.name}</div>
              <div>{admin.role}</div>
            </div>
            <button className="button" onClick={onLogout}>Logout</button>
          </div>
        ) : null}
      </div>
    </header>
  );
};

export default Header; 