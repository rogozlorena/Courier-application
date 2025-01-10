import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UpdatePackage = ({ packageId }) => {
  const [packageDetails, setPackageDetails] = useState({
    deliveryAddress: '',
    payOnDelivery: false,
    status: 'NEW'
  });

  useEffect(() => {
    const fetchPackage = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/package/get-package/${packageId}`);
        setPackageDetails(response.data);
      } catch (error) {
        console.error('Error fetching package details:', error);
      }
    };

    fetchPackage();
  }, [packageId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/package/update-package/${packageId}`, packageDetails);
      alert('Package Updated');
    } catch (error) {
      console.error('Error updating package:', error);
      alert('Failed to update package');
    }
  };

  return (
    <div>
      <h2>Update Package</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Delivery Address:</label>
          <input
            type="text"
            value={packageDetails.deliveryAddress}
            onChange={(e) => setPackageDetails({ ...packageDetails, deliveryAddress: e.target.value })}
            required
          />
        </div>
        <div>
          <label>Pay on Delivery:</label>
          <input
            type="checkbox"
            checked={packageDetails.payOnDelivery}
            onChange={(e) => setPackageDetails({ ...packageDetails, payOnDelivery: e.target.checked })}
          />
        </div>
        <div>
          <label>Status:</label>
          <select
            value={packageDetails.status}
            onChange={(e) => setPackageDetails({ ...packageDetails, status: e.target.value })}
          >
            <option value="NEW">NEW</option>
            <option value="PENDING">PENDING</option>
            <option value="DELIVERED">DELIVERED</option>
          </select>
        </div>
        <button type="submit">Update Package</button>
      </form>
    </div>
  );
};

export default UpdatePackage;
