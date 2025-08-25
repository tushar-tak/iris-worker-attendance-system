import React, { useState } from 'react';
import Card from '../../components/Card';

const ChangePassword: React.FC = () => {
  const [current, setCurrent] = useState('');
  const [next, setNext] = useState('');
  const [confirm, setConfirm] = useState('');
  const [saved, setSaved] = useState(false);

  const onSave = () => {
    if (!current || !next || next !== confirm) return;
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  };

  return (
    <Card title="Change Password">
      <div style={{ maxWidth: 420 }}>
        <div style={{ marginBottom: 12 }}>
          <label className="label" htmlFor="cp1">Current Password</label>
          <input id="cp1" type="password" className="input" value={current} onChange={(e) => setCurrent(e.target.value)} />
        </div>
        <div className="form-row" style={{ marginBottom: 12 }}>
          <div>
            <label className="label" htmlFor="cp2">New Password</label>
            <input id="cp2" type="password" className="input" value={next} onChange={(e) => setNext(e.target.value)} />
          </div>
          <div>
            <label className="label" htmlFor="cp3">Confirm New Password</label>
            <input id="cp3" type="password" className="input" value={confirm} onChange={(e) => setConfirm(e.target.value)} />
          </div>
        </div>
        <button className="button" onClick={onSave} disabled={!current || !next || next !== confirm}>
          Save
        </button>
        {saved ? <div className="small" style={{ color: 'var(--success)', marginTop: 8 }}>Password changed (placeholder)</div> : null}
      </div>
    </Card>
  );
};

export default ChangePassword; 