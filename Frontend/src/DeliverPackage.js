import React, { useState } from 'react';
import axios from 'axios';

const DeliverPackage = () => {
  const [packageId, setPackageId] = useState('');

  const handleDeliver = async () => {
    try {
      await axios.put(`http://localhost:8080/package/update-package/${packageId}`, {
        status: 'DELIVERED'
      });
      alert('Package Delivered');
    } catch (error) {
      console.error('Error delivering package:', error);
      alert('Failed to deliver package');
    }
  };

  return (
    <div>
      <h2>Deliver Package</h2>
      <div>
        <label>Package ID:</label>
        <input
          type="text"
          value={packageId}
          onChange={(e) => setPackageId(e.target.value)}
        />
      </div>
      <button onClick={handleDeliver}>Deliver Package</button>
    </div>
  );
};

export default DeliverPackage;
