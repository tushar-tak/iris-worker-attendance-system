import React from 'react';
import Card from '../../components/Card';

const Contact: React.FC = () => {
  return (
    <Card title="Contact Us">
      <p className="small">For support, reach out to the district MNREGA cell.</p>
      <ul>
        <li>Email: support@mnrega.gov.example</li>
        <li>Phone: 1800-000-1234</li>
      </ul>
    </Card>
  );
};

export default Contact; 