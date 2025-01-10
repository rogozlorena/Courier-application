import React, { useState, useEffect } from "react";

const AssignPackage = () => {
  const [packages, setPackages] = useState([]); // Lista de pachete
  const [couriers, setCouriers] = useState([]); // Lista de curieri
  const [selectedPackage, setSelectedPackage] = useState(null); // Pachetul selectat
  const [selectedCourierId, setSelectedCourierId] = useState(""); // Curierul selectat

  useEffect(() => {
    // Fetch pachete neatribuite
    const fetchPackages = async () => {
      try {
        const response = await fetch("http://localhost:8081/package/get-package");
        const data = await response.json();
        const unassignedPackages = data.filter((pkg) => pkg.courier === null); // Filtrează pachetele neatribuite
        setPackages(unassignedPackages);
      } catch (error) {
        console.error("Error fetching packages:", error);
      }
    };

    // Fetch curieri
    const fetchCouriers = async () => {
      try {
        const response = await fetch("http://localhost:8081/get-courier");
        const data = await response.json();
        setCouriers(data);
      } catch (error) {
        console.error("Error fetching couriers:", error);
      }
    };

    fetchPackages();
    fetchCouriers();
  }, []);

  const assignPackage = async () => {
    if (!selectedPackage || !selectedCourierId) {
      alert("Please select both a package and a courier.");
      return;
    }

    const updatedPackage = {
      courier: { id: parseInt(selectedCourierId, 10) }, // Asigură-te că este numeric
      payOnDelivery: selectedPackage.payOnDelivery,
      status: "PENDING", // Sau alt status dorit
      createdOn: selectedPackage.createdOn, // Data trebuie să fie în format ISO-8601
      deliveryAddress: selectedPackage.deliveryAddress,
    };

    try {
      console.log("Payload trimis:", updatedPackage);

      const response = await fetch(
        `http://localhost:8081/package/update-package/${selectedPackage.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json", // Asigură-te că specifici tipul corect
          },
          body: JSON.stringify(updatedPackage), // Trimite payload-ul ca JSON
        }
      );

      if (!response.ok) {
        throw new Error("Failed to assign package");
      }

      alert("Package assigned successfully!");
      setSelectedPackage(null); // Resetează selecția
      setSelectedCourierId(""); // Resetează selecția
      window.location.reload(); // Reîncarcă datele
    } catch (error) {
      console.error("Error assigning package:", error);
      alert("Failed to assign package. Please try again.");
    }
  };

  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "600px",
        margin: "auto",
        backgroundColor: "#f9f5f0", // Bej deschis
        borderRadius: "10px",
        border: "1px solid #e0dcd9",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          color: '#d39db7', 
          marginBottom: "20px",
        }}
      >
        Assign Package to Courier
      </h2>

      <div style={{ marginBottom: "20px" }}>
        <label
          htmlFor="package-select"
          style={{ fontWeight: "bold", color: "#6e6e6e" }} // Gri
        >
          Select Package:
        </label>
        <select
          id="package-select"
          value={selectedPackage?.id || ""}
          onChange={(e) => {
            const pkg = packages.find((p) => p.id === parseInt(e.target.value, 10));
            setSelectedPackage(pkg);
          }}
          style={{
            width: "100%",
            padding: "10px",
            marginTop: "10px",
            borderRadius: "5px",
            border: "1px solid #e0dcd9",
            backgroundColor: "#fff",
          }}
        >
          <option value="">-- Select Package --</option>
          {packages.map((pkg) => (
            <option key={pkg.id} value={pkg.id}>
              {pkg.id} - {pkg.deliveryAddress}
            </option>
          ))}
        </select>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <label
          htmlFor="courier-select"
          style={{ fontWeight: "bold", color: "#6e6e6e" }} // Gri
        >
          Select Courier:
        </label>
        <select
          id="courier-select"
          value={selectedCourierId}
          onChange={(e) => setSelectedCourierId(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginTop: "10px",
            borderRadius: "5px",
            border: "1px solid #e0dcd9",
            backgroundColor: "#fff",
          }}
        >
          <option value="">-- Select Courier --</option>
          {couriers.map((courier) => (
            <option key={courier.id} value={courier.id}>
              {courier.id} - {courier.name}
            </option>
          ))}
        </select>
      </div>

      <button
        onClick={assignPackage}
        style={{
          width: "100%",
          padding: "12px",
          backgroundColor: '#d39db7', 
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          fontWeight: "bold",
        }}
      >
        Assign Package
      </button>
    </div>
  );
};

export default AssignPackage;
