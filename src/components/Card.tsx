import React from 'react';

const Card: React.FC<{ title?: string; right?: React.ReactNode; children: React.ReactNode }>
  = ({ title, right, children }) => {
  return (
    <div style={{ background: 'var(--card-bg)', border: '1px solid var(--card-border)', borderRadius: 8, boxShadow: 'var(--shadow)', padding: 16 }}>
      {(title || right) ? (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
          <div className="section-title">{title}</div>
          {right}
        </div>
      ) : null}
      <div>
        {children}
      </div>
    </div>
  );
};

export default Card; 