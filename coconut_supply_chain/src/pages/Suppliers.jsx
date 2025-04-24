import React, { useEffect, useState } from "react";
import { auth } from "../firebase";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  orderBy,
  Timestamp,
} from "firebase/firestore";

const db = getFirestore();

const Suppliers = () => {
  const [allEntries, setAllEntries] = useState([]);
  const [filteredSuppliers, setFilteredSuppliers] = useState([]);
  const [expandedSupplier, setExpandedSupplier] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const user = auth.currentUser;
        if (!user) return;

        const q = query(
          collection(db, "suppliers", user.uid, "data"),
          orderBy("timestamp", "desc")
        );
        const snapshot = await getDocs(q);

        const entries = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setAllEntries(entries);
        setFilteredSuppliers(groupBySupplierId(entries));
      } catch (error) {
        console.error("Error fetching suppliers:", error);
      }
    };

    fetchSuppliers();
  }, []);

  const groupBySupplierId = (entries) => {
    const grouped = {};
    for (let entry of entries) {
      const { supplierId, supplier } = entry;
      if (!grouped[supplierId]) {
        grouped[supplierId] = {
          supplierName: supplier,
          entries: [],
        };
      }
      grouped[supplierId].entries.push(entry);
    }
    return grouped;
  };

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    const filtered = allEntries.filter((entry) =>
      entry.supplierId.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredSuppliers(groupBySupplierId(filtered));
  };

  const toggleSupplier = (supplierId) => {
    setExpandedSupplier((prev) => (prev === supplierId ? null : supplierId));
  };

  return (
    <div style={styles.container}>
      <h2>My Supplier Profiles</h2>
      <input
        type="text"
        placeholder="Search by Supplier ID"
        value={searchTerm}
        onChange={handleSearchChange}
        style={styles.search}
      />

      {Object.keys(filteredSuppliers).length === 0 ? (
        <p>No supplier data available.</p>
      ) : (
        Object.entries(filteredSuppliers).map(([supplierId, { supplierName, entries }]) => (
          <div key={supplierId} style={styles.profile}>
            <div style={styles.profileHeader} onClick={() => toggleSupplier(supplierId)}>
              <strong>Supplier ID:</strong> {supplierId}<br />
              <strong>Name:</strong> {supplierName}
            </div>
            {expandedSupplier === supplierId && (
              <ul style={styles.entryList}>
                {entries.map((entry) => (
                  <li key={entry.id} style={styles.entry}>
                    <strong>Timestamp:</strong> {entry.timestamp instanceof Timestamp ? entry.timestamp.toDate().toLocaleString() : "Invalid Date"}<br />
                    <strong>Location:</strong> {entry.location}<br />
                    <strong>Quantity:</strong> {entry.quantity}<br />
                    <strong>Price/Unit:</strong> {entry.pricePerUnit}<br />
                    <strong>Harvest Date:</strong> {entry.harvestDate}<br />
                    <strong>Quality Grade:</strong> {entry.qualityGrade}<br />
                    <strong>Transport Cost:</strong> {entry.transportCost}<br />
                    <strong>Storage Cost:</strong> {entry.storageCost}<br />
                    <strong>Demand Forecast:</strong> {entry.demandForecast}<br />
                    <strong>Exported:</strong> {entry.isExported ? "Yes" : "No"}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))
      )}
    </div>
  );
};

const styles = {
  container: {
    color: "#333",
    background: "#fff",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  },
  search: {
    background: "#fff",
    color: "#333",
    padding: "8px",
    marginBottom: "20px",
    width: "100%",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  profile: {
    marginBottom: "15px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    padding: "10px",
    background: "#f9f9f9",
  },
  profileHeader: {
    cursor: "pointer",
    background: "#e6e6e6",
    padding: "10px",
    borderRadius: "5px",
  },
  entryList: {
    listStyle: "none",
    paddingLeft: "20px",
  },
  entry: {
    padding: "10px",
    borderBottom: "1px solid #ccc",
    background: "#fff",
  },
};

export default Suppliers;
