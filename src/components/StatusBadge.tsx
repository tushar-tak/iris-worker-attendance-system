import React from 'react';

type Props = { status: 'pending' | 'matched' | 'not_matched'; confidence?: number };

const StatusBadge: React.FC<Props> = ({ status, confidence }) => {
  const map: Record<string, { bg: string; color: string; text: string }> = {
    pending: { bg: '#fef3c7', color: '#92400e', text: 'Pending' },
    matched: { bg: '#d1fae5', color: '#065f46', text: 'Matched' },
    not_matched: { bg: '#fee2e2', color: '#991b1b', text: 'Not Matched' },
  };
  const s = map[status];
  return (
    <span style={{ background: s.bg, color: s.color, borderRadius: 999, padding: '2px 8px', fontSize: 12, fontWeight: 700 }}>
      {s.text}{status === 'matched' && typeof confidence === 'number' ? ` (${Math.round(confidence * 100)}%)` : ''}
    </span>
  );
};

export default StatusBadge; 