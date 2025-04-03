import React, { useState } from "react";
import axios from "axios";

function DataInput() {
  const [formData, setFormData] = useState({
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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate input fields
    if (formData.quantity <= 0 || formData.pricePerUnit <= 0 || formData.transportCost < 0 || formData.storageCost < 0) {
      setMessage({ text: "Invalid input values. Please enter positive numbers.", type: "error" });
      return;
    }

    try {
      await axios.post("http://localhost:5000/add-supply", formData);
      setMessage({ text: "Data submitted successfully!", type: "success" });
      setFormData({
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
      setMessage({ text: "Error submitting data. Please try again.", type: "error" });
    }
  };

  return (
    <div style={Datastyles.Datacontainer}>
      <h2> Coconut Supply Data</h2>
      {message && <p style={message.type === "success" ? Datastyles.success : Datastyles.error}>{message.text}</p>}
      <form onSubmit={handleSubmit} style={Datastyles.form}>
        <label>Supplier Name:</label>
        <input type="text" name="supplier" value={formData.supplier} onChange={handleChange} required style={Datastyles.input} />

        <label>Location (District/Market):</label>
        <input type="text" name="location" value={formData.location} onChange={handleChange} required style={Datastyles.input} />

        <label>Quantity (Units):</label>
        <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} required style={Datastyles.input} min="1" />

        <label>Price per Unit (LKR):</label>
        <input type="number" name="pricePerUnit" value={formData.pricePerUnit} onChange={handleChange} required style={Datastyles.input} min="1" />

        <label>Harvest Date:</label>
        <input type="date" name="harvestDate" value={formData.harvestDate} onChange={handleChange} required style={Datastyles.input} />

        <label>Quality Grade:</label>
        <select name="qualityGrade" value={formData.qualityGrade} onChange={handleChange} style={Datastyles.input}>
          <option value="A">Grade A (Premium)</option>
          <option value="B">Grade B (Standard)</option>
          <option value="C">Grade C (Utility)</option>
        </select>

        <label>Transport Cost per Unit (LKR):</label>
        <input type="number" name="transportCost" value={formData.transportCost} onChange={handleChange} required style={Datastyles.input} min="0" />

        <label>Storage Cost per Unit (LKR/month):</label>
        <input type="number" name="storageCost" value={formData.storageCost} onChange={handleChange} required style={Datastyles.input} min="0" />

        <label>Demand Forecast (Units):</label>
        <input type="number" name="demandForecast" value={formData.demandForecast} onChange={handleChange} style={Datastyles.input} min="0" />

        <label>
          <input type="checkbox" name="isExported" checked={formData.isExported} onChange={handleChange} />
          Mark for Export
        </label>

        <button type="submit" style={Datastyles.button}>Submit</button>
      </form>
    </div>
  );
}

const Datastyles = {
  Datacontainer: {
    justyfyContent: "center",
    align: "center",
    padding: "20px",
    margin: "0",
    textAlign: "left",
    fontFamily: "Arial, sans-serif",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  input: {
    padding: "8px",
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
    fontSize: "16px",
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