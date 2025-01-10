import React, { useState } from 'react';

const FindPackage = () => {
  const [packageId, setPackageId] = useState('');
  const [packageData, setPackageData] = useState(null);
  const [error, setError] = useState('');

  const handleFetchPackage = async () => {
    try {
      setError('');
      setPackageData(null);
      const response = await fetch(`http://localhost:8081/package/get-package/${packageId}`);
      if (response.ok) {
        const data = await response.json();
        setPackageData(data);
      } else if (response.status === 404) {
        setError('Package not found');
      } else {
        setError('An error occurred while fetching the package');
      }
    } catch (err) {
      setError('An error occurred. Please try again later.');
    }
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h2 style={{ color: '#d39db7' }}>Find Package</h2>
      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Enter package ID"
          value={packageId}
          onChange={(e) => setPackageId(e.target.value)}
          style={{
            padding: '10px',
            borderRadius: '5px',
            border: '1px solid #ccc',
            width: '200px',
          }}
        />
        <button
          onClick={handleFetchPackage}
          style={{
            marginLeft: '10px',
            padding: '10px 20px',
            backgroundColor: '#fbeef0',
            border: 'none',
            borderRadius: '5px',
            color: '#7d7d7d',
            fontWeight: 'bold',
            cursor: 'pointer',
            transition: 'background-color 0.3s',
          }}
        >
          Search
        </button>
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {packageData && (
        <div
          style={{
            textAlign: 'left',
            margin: '0 auto',
            padding: '20px',
            maxWidth: '400px',
            border: '1px solid #ddd',
            borderRadius: '5px',
            backgroundColor: '#fbeef0',
          }}
        >
          <h3 style={{ color: '#7d7d7d' }}>Package Details</h3>
          <p><strong>ID:</strong> {packageData.id}</p>
          <p><strong>Courier:</strong> {packageData.courier.name} ({packageData.courier.mail})</p>
          <p><strong>Created On:</strong> {new Date(packageData.createdOn).toLocaleDateString()}</p>
          <p><strong>Delivery Address:</strong> {packageData.deliveryAddress}</p>
          <p><strong>Pay on Delivery:</strong> {packageData.payOnDelivery ? 'Yes' : 'No'}</p>
          <p><strong>Status:</strong> {packageData.status}</p>
        </div>
      )}
    </div>
  );
};

export default FindPackage;
