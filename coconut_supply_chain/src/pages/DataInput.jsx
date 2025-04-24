import React, { useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db, auth } from "../firebase";

function DataInput() {
  const [formData, setFormData] = useState({
    supplierId: "",
    supplier: "",
    location: "",
    quantity: "",
    pricePerUnit: "",
    harvestDate: "",
    qualityGrade: "A",
    transportCost: "",
    storageCost: "",
    demandForecast: "",
    isExported: false,
  });

  const [message, setMessage] = useState(null);
  const [userId, setUserId] = useState(null);

  // Get current user from Firebase Auth
  onAuthStateChanged(auth, (user) => {
    if (user) setUserId(user.uid);
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId) {
      setMessage({ text: "User not authenticated", type: "error" });
      return;
    }

    try {
      // Add new data entry to Firestore (using addDoc to avoid overwriting)
      await addDoc(collection(db, "suppliers", userId, "data"), {
        ...formData,
        timestamp: serverTimestamp(),
      });
      
      setMessage({ text: "Data submitted successfully!", type: "success" });

      // Reset form
      setFormData({
        supplierId: "",
        supplier: "",
        location: "",
        quantity: "",
        pricePerUnit: "",
        harvestDate: "",
        qualityGrade: "A",
        transportCost: "",
        storageCost: "",
        demandForecast: "",
        isExported: false,
      });
    } catch (error) {
      console.error("Firestore Error:", error);
      setMessage({ text: "Error submitting data.", type: "error" });
    }
  };

  return (
    <div style={styles.container}>
      <h2>Coconut Supply Data</h2>
      {message && <p style={message.type === "success" ? styles.success : styles.error}>{message.text}</p>}
      <form onSubmit={handleSubmit} style={styles.form}>
        <input type="text" name="supplierId" value={formData.supplierId} onChange={handleChange} placeholder="Supplier ID" style={styles.input} required />
        <input type="text" name="supplier" value={formData.supplier} onChange={handleChange} placeholder="Supplier Name" style={styles.input} required />
        <input type="text" name="location" value={formData.location} onChange={handleChange} placeholder="Location" style={styles.input} required />
        <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} placeholder="Quantity" style={styles.input} required />
        <input type="number" name="pricePerUnit" value={formData.pricePerUnit} onChange={handleChange} placeholder="Price per Unit" style={styles.input} required />
        <input type="date" name="harvestDate" value={formData.harvestDate} onChange={handleChange} style={styles.input} required />
        <select name="qualityGrade" value={formData.qualityGrade} onChange={handleChange} style={styles.input}>
          <option value="A">Grade A</option>
          <option value="B">Grade B</option>
          <option value="C">Grade C</option>
        </select>
        <input type="number" name="transportCost" value={formData.transportCost} onChange={handleChange} placeholder="Transport Cost" style={styles.input} required />
        <input type="number" name="storageCost" value={formData.storageCost} onChange={handleChange} placeholder="Storage Cost" style={styles.input} required />
        <input type="number" name="demandForecast" value={formData.demandForecast} onChange={handleChange} placeholder="Demand Forecast" style={styles.input} />
        <label>
          <input type="checkbox" name="isExported" checked={formData.isExported} onChange={handleChange} />
          Exported
        </label>
        <button type="submit" style={styles.button}>Submit</button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    color: "#333",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  input: {
    backgroundColor: "#f9f9f9",
    color: "#333",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "4px",
  },
  button: {
    backgroundColor: "#2c5a2e",
    color: "white",
    padding: "10px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  success: {
    color: "green",
    fontWeight: "bold",
  },
  error: {
    color: "red",
    fontWeight: "bold",
  },
};

export default DataInput;
