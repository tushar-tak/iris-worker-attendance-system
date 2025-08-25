import React, { useState } from 'react';
import Card from '../../components/Card';

const Feedback: React.FC = () => {
  const [text, setText] = useState('');
  const [sent, setSent] = useState(false);
  return (
    <Card title="Feedback">
      {sent ? (
        <div>Thank you for your feedback.</div>
      ) : (
        <div>
          <label className="label" htmlFor="fb">Your Feedback</label>
          <textarea id="fb" className="input" style={{ minHeight: 120 }} value={text} onChange={(e) => setText(e.target.value)} placeholder="Share your suggestions…" />
          <div style={{ marginTop: 8 }}>
            <button className="button" onClick={() => setSent(true)} disabled={!text.trim()}>Submit</button>
          </div>
        </div>
      )}
    </Card>
  );
};

export default Feedback; 