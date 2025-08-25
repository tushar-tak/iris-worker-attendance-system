import React from 'react';
import Card from '../../components/Card';

const Help: React.FC = () => {
  return (
    <Card title="Help / FAQs">
      <div>
        <p>Frequently asked questions:</p>
        <ul>
          <li>How do I mark attendance? — Go to Current Team and verify worker ID + IIRS.</li>
          <li>Why is verification failing? — This demo simulates randomness; backend will improve accuracy.</li>
          <li>How do I add new work? — Use the New Work page to create teams and add workers.</li>
        </ul>
      </div>
    </Card>
  );
};

export default Help; 