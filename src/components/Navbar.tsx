import React from 'react';
import { NavLink } from 'react-router-dom';

const linkStyle: React.CSSProperties = {
  padding: '8px 12px',
  borderRadius: 6,
  color: 'var(--accent-blue)'
};

const activeStyle: React.CSSProperties = {
  ...linkStyle,
  background: '#e6f0fb',
  border: '1px solid var(--card-border)'
};

const Navbar: React.FC = () => {
  return (
    <nav style={{ background: 'var(--card-bg)', borderBottom: '1px solid var(--card-border)' }}>
      <div className="container" style={{ display: 'flex', gap: 8, padding: 8, flexWrap: 'wrap' }}>
        <NavLink to="/" style={({ isActive }) => (isActive ? activeStyle : linkStyle)}>Home</NavLink>
        <NavLink to="/teams" style={({ isActive }) => (isActive ? activeStyle : linkStyle)}>Current Team</NavLink>
        <NavLink to="/new-work" style={({ isActive }) => (isActive ? activeStyle : linkStyle)}>New Work</NavLink>
        <NavLink to="/about" style={({ isActive }) => (isActive ? activeStyle : linkStyle)}>About</NavLink>
        <NavLink to="/settings" style={({ isActive }) => (isActive ? activeStyle : linkStyle)}>Settings</NavLink>
      </div>
    </nav>
  );
};

export default Navbar; 