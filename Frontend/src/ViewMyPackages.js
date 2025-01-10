import React, { useState, useEffect } from 'react';

const ViewPackages = () => {
  const [packages, setPackages] = useState([]); // Lista de pachete
  const [couriers, setCouriers] = useState([]); // Lista de curieri
  const [selectedPackage, setSelectedPackage] = useState(null); // Pachetul selectat
  const [selectedCourierId, setSelectedCourierId] = useState(""); // Curierul selectat
  const [updatedPackage, setUpdatedPackage] = useState({}); // Pachetul actualizat
  const [isModalOpen, setIsModalOpen] = useState(false); // Control modal visibility

  useEffect(() => {
    fetch('http://localhost:8081/package/get-package')
      .then((response) => response.json())
      .then((data) => setPackages(data))
      .catch((error) => console.error('Error fetching packages:', error));

    fetch('http://localhost:8081/get-courier')
      .then((response) => response.json())
      .then((data) => setCouriers(data))
      .catch((error) => console.error('Error fetching couriers:', error));
  }, []);

  const handleEdit = (pkg) => {
    setSelectedPackage(pkg);
    setSelectedCourierId(pkg.courier ? pkg.courier.id : "");
    setUpdatedPackage(pkg); // Preîncărcăm datele în formularul de editare
    setIsModalOpen(true); // Deschide modalul
  };

  const handleSave = async () => {
    if (!updatedPackage || !selectedCourierId) {
      alert("Please select both a package and a courier.");
      return;
    }

    const packageToUpdate = {
      ...updatedPackage,
      courier: { id: parseInt(selectedCourierId, 10) }, // Asigură-te că este numeric
    };

    try {
      const response = await fetch(
        `http://localhost:8081/package/update-package/${updatedPackage.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(packageToUpdate),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to update package');
      }

      alert('Package updated successfully!');
      setSelectedPackage(null); // Resetează selecția
      setUpdatedPackage({}); // Resetează datele
      setSelectedCourierId(""); // Resetează selecția
      setIsModalOpen(false); // Închide modalul
      window.location.reload(); // Reîncarcă datele
    } catch (error) {
      console.error('Error updating package:', error);
      alert('Failed to update package. Please try again.');
    }
  };

  const handleDelete = async (pkgId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this package?");
    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `http://localhost:8081/package/delete-package/${pkgId}`,
        {
          method: 'DELETE',
        }
      );

      if (!response.ok) {
        throw new Error('Failed to delete package');
      }

      alert('Package deleted successfully!');
      setPackages(packages.filter((pkg) => pkg.id !== pkgId)); // Elimină pachetul din UI
    } catch (error) {
      console.error('Error deleting package:', error);
      alert('Failed to delete package. Please try again.');
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setUpdatedPackage({}); // Reset form data
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>View Packages</h2>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>ID</th>
            <th style={styles.th}>Courier Name</th>
            <th style={styles.th}>Courier Email</th>
            <th style={styles.th}>Created On</th>
            <th style={styles.th}>Delivery Address</th>
            <th style={styles.th}>Pay on Delivery</th>
            <th style={styles.th}>Status</th>
            <th style={styles.th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {packages.map((pkg) => (
            <tr key={pkg.id} style={styles.row}>
              <td style={styles.td}>{pkg.id}</td>
              <td style={styles.td}>{pkg.courier ? pkg.courier.name : 'N/A'}</td>
              <td style={styles.td}>{pkg.courier ? pkg.courier.mail : 'N/A'}</td>
              <td style={styles.td}>{new Date(pkg.createdOn).toLocaleString()}</td>
              <td style={styles.td}>{pkg.deliveryAddress || 'N/A'}</td>
              <td style={styles.td}>{pkg.payOnDelivery ? 'Yes' : 'No'}</td>
              <td style={styles.td}>{pkg.status || 'N/A'}</td>
              <td style={styles.td}>
                <button
                  onClick={() => handleEdit(pkg)}
                  style={styles.editButton}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(pkg.id)}
                  style={styles.deleteButton}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal pentru editare */}
      {isModalOpen && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <h3>Edit Package</h3>
            <div>
              <label>Courier:</label>
              <select
                value={selectedCourierId}
                onChange={(e) => setSelectedCourierId(e.target.value)}
                style={styles.input}
              >
                <option value="">-- Select Courier --</option>
                {couriers.map((courier) => (
                  <option key={courier.id} value={courier.id}>
                    {courier.id} - {courier.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label>Courier Email:</label>
              <input
                type="email"
                value={updatedPackage.courier ? updatedPackage.courier.mail : ""}
                onChange={(e) =>
                  setUpdatedPackage({
                    ...updatedPackage,
                    courier: { ...updatedPackage.courier, mail: e.target.value },
                  })
                }
                style={styles.input}
              />
            </div>
            <div>
              <label>Delivery Address:</label>
              <input
                type="text"
                value={updatedPackage.deliveryAddress || ""}
                onChange={(e) => setUpdatedPackage({ ...updatedPackage, deliveryAddress: e.target.value })}
                style={styles.input}
              />
            </div>
            <div>
              <label>Status:</label>
              <input
                type="text"
                value={updatedPackage.status || ""}
                onChange={(e) => setUpdatedPackage({ ...updatedPackage, status: e.target.value })}
                style={styles.input}
              />
            </div>
            <div>
              <label>Pay on Delivery:</label>
              <select
                value={updatedPackage.payOnDelivery ? 'Yes' : 'No'}
                onChange={(e) => setUpdatedPackage({ ...updatedPackage, payOnDelivery: e.target.value === 'Yes' })}
                style={styles.input}
              >
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
            <button onClick={handleSave} style={styles.saveButton}>
              Save Changes
            </button>
            <button onClick={closeModal} style={styles.closeButton}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: '#fdf7f2', // Bej deschis
    padding: '20px',
    borderRadius: '8px',
    margin: '20px auto',
    width: '90%',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  heading: {
    color: '#d39db7', // Roz închis
    textAlign: 'center',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  th: {
    backgroundColor: '#d39db7',
    color: '#fff',
    padding: '10px',
    textAlign: 'left',
  },
  td: {
    padding: '10px',
    borderBottom: '1px solid #ccc',
  },
  row: {
    backgroundColor: '#fff',
    ':hover': {
      backgroundColor: '#fbeef0', // Roz deschis
    },
  },
  editButton: {
    backgroundColor: '#f39c12',
    color: '#fff',
    border: 'none',
    padding: '5px 10px',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    marginRight: '10px',
  },
  deleteButton: {
    backgroundColor: '#e74c3c',
    color: '#fff',
    border: 'none',
    padding: '5px 10px',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    minWidth: '400px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  input: {
    width: '100%',
    padding: '10px',
    marginTop: '10px',
    borderRadius: '5px',
    border: '1px solid #e0dcd9',
    backgroundColor: '#fff',
  },
  saveButton: {
    width: '100%',
    padding: '12px',
    backgroundColor: '#d39db7', // Roz închis
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: 'bold',
    marginTop: '20px',
  },
  closeButton: {
    width: '100%',
    padding: '12px',
    backgroundColor: '#e74c3c', // Roșu pentru a indica anularea
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: 'bold',
    marginTop: '10px',
  },
};

export default ViewPackages;

