import React, { useState, useEffect } from 'react';

const ViewUnassignedPackages = () => {
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    // Fetch all packages and filter unassigned ones
    fetch('http://localhost:8081/package/get-package')
      .then((response) => response.json())
      .then((data) => {
        const unassigned = data.filter((pkg) => pkg.courier === null);
        setPackages(unassigned);
      })
      .catch((error) => console.error('Error fetching packages:', error));
  }, []);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        minHeight: '10vh', // Mutăm mai sus componenta
        backgroundColor: '#f9f9f9',
        padding: '20px',
      }}
    >
      <h2 style={{ color: '#d39db7', marginBottom: '20px' }}>Unassigned Packages</h2>
      {packages.length === 0 ? (
        <p style={{ fontSize: '18px', color: '#888' }}>No unassigned packages available.</p>
      ) : (
        <table
          style={{
            width: '80%',
            borderCollapse: 'collapse',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            backgroundColor: '#ffffff',
          }}
        >
          <thead>
            <tr style={{ backgroundColor: '#d39db7', color: '#ffffff' }}>
              <th style={styles.th}>Package ID</th>
              <th style={styles.th}>Delivery Address</th>
              <th style={styles.th}>Status</th>
            </tr>
          </thead>
          <tbody>
            {packages.map((pkg) => (
              <tr key={pkg.id} style={{ textAlign: 'center' }}>
                <td style={styles.td}>{pkg.id}</td>
                <td style={styles.td}>{pkg.deliveryAddress}</td>
                <td style={styles.td}>{pkg.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

const styles = {
  th: {
    padding: '10px',
    textAlign: 'center',
    borderBottom: '2px solid #ddd',
  },
  td: {
    padding: '10px',
    textAlign: 'center',
    borderBottom: '1px solid #ddd',
  },
};

export default ViewUnassignedPackages;