import React, { useState } from 'react';

const CreatePackage = () => {
  const [packageData, setPackageData] = useState({
    courierId: '', // Initializăm fără un curier selectat
    payOnDelivery: true,
    status: 'NEW',
    deliveryAddress: '',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPackageData({
      ...packageData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Dacă nu există un curier selectat, trimitem null pentru curier
    const newPackage = {
      courier: packageData.courierId ? { id: packageData.courierId } : null,
      payOnDelivery: packageData.payOnDelivery,
      status: packageData.status,
      createdOn: new Date().toISOString(),
      deliveryAddress: packageData.deliveryAddress,
    };

    fetch('http://localhost:8081/package/create-package', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newPackage),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Package created:', data);
        alert('Package created successfully!');
      })
      .catch((error) => console.error('Error creating package:', error));
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Create Package</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        {/* Select pentru curier - acum este opțional */}
        <div style={styles.inputGroup}>
          <label style={styles.label}>Courier (Optional):</label>
          <select
            name="courierId"
            value={packageData.courierId}
            onChange={handleChange}
            style={styles.input}
          >
            <option value="">-- Select Courier (Optional) --</option>
            <option value={1}>Courier 1</option>
            <option value={2}>Courier 2</option>
            <option value={3}>Courier 3</option>
          </select>
        </div>

        {/* Adresa de livrare */}
        <div style={styles.inputGroup}>
          <label style={styles.label}>Delivery Address:</label>
          <input
            type="text"
            name="deliveryAddress"
            value={packageData.deliveryAddress}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>

        {/* Statusul pachetului */}
        <div style={styles.inputGroup}>
          <label style={styles.label}>Status:</label>
          <select
            name="status"
            value={packageData.status}
            onChange={handleChange}
            style={styles.input}
          >
            <option value="NEW">NEW</option>
            <option value="PENDING">PENDING</option>
            <option value="DELIVERED">DELIVERED</option>
          </select>
        </div>

        {/* Pay on delivery */}
        <div style={styles.inputGroup}>
          <label style={styles.label}>
            <input
              type="checkbox"
              name="payOnDelivery"
              checked={packageData.payOnDelivery}
              onChange={handleChange}
              style={styles.checkbox}
            />
            Pay on Delivery
          </label>
        </div>

        <button type="submit" style={styles.button}>
          Create Package
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: '#fbeef0',
    border: '1px solid #e6e6e6',
    borderRadius: '8px',
    padding: '20px',
    width: '400px',
    margin: '20px auto',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  heading: {
    color: '#d39db7',
    textAlign: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    color: '#7d7d7d',
    marginBottom: '5px',
  },
  input: {
    padding: '8px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  checkbox: {
    marginRight: '10px',
  },
  button: {
    backgroundColor: '#d39db7',
    color: '#fff',
    border: 'none',
    padding: '10px',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  buttonHover: {
    backgroundColor: '#c0869f',
  },
};

export default CreatePackage;
