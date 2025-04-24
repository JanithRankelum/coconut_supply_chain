import React, { useState } from "react";
import axios from "axios";

function Predictions() {
  const [priceInputs, setPriceInputs] = useState({
    year: "",
    month: "",
    day: "",
    province: "",
    district: "",
    market: ""
  });

  const [demandInputs, setDemandInputs] = useState({
    year: "",
    month: "",
    dayofweek: "",
    market: "",
    district: "",
    province: "",
    category: "",
    lag_demand_1: "",
    price: ""
  });

  const [priceResult, setPriceResult] = useState(null);
  const [demandResult, setDemandResult] = useState(null);
  const [loadingPrice, setLoadingPrice] = useState(false);
  const [loadingDemand, setLoadingDemand] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    setPriceInputs(prev => ({
      ...prev,
      [name]: name === 'year' || name === 'month' || name === 'day' 
        ? parseInt(value) || value 
        : value
    }));
  };

  const handleDemandChange = (e) => {
    const { name, value } = e.target;
    setDemandInputs(prev => ({
      ...prev,
      [name]: name === 'year' || name === 'month' || name === 'dayofweek' || 
              name === 'lag_demand_1' ? parseInt(value) || value :
              name === 'price' ? parseFloat(value) || value :
              value
    }));
  };

  const validateInputs = (inputs, fields) => {
    for (const field of fields) {
      if (!inputs[field.name] && inputs[field.name] !== 0) {
        return `Missing ${field.name}`;
      }
      if (field.min !== undefined && inputs[field.name] < field.min) {
        return `${field.name} must be at least ${field.min}`;
      }
      if (field.max !== undefined && inputs[field.name] > field.max) {
        return `${field.name} must be at most ${field.max}`;
      }
    }
    return null;
  };

  const submitPricePrediction = async (e) => {
    e.preventDefault();
    
    const priceFields = [
      { name: "year", min: 2000, max: 2030 },
      { name: "month", min: 1, max: 12 },
      { name: "day", min: 1, max: 31 },
      { name: "province" },
      { name: "district" },
      { name: "market" }
    ];

    const validationError = validateInputs(priceInputs, priceFields);
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoadingPrice(true);
    setError("");
    setSuccess("");
    
    try {
      console.log("Sending price prediction data:", priceInputs);
      const res = await axios.post(
        "https://nipunmanu-coconutpriceprediction.hf.space/predict/price",
        priceInputs,
        { 
          headers: { 
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          timeout: 10000
        }
      );
      console.log("Price prediction response:", res.data);
      setPriceResult(res.data.predicted_price);
      setSuccess("Price predicted successfully!");
    } catch (error) {
      console.error("Full price prediction error:", error);
      const errorMsg = error.response?.data?.error || 
                      error.message || 
                      "Price prediction failed";
      setError(`API Error: ${errorMsg}`);
    } finally {
      setLoadingPrice(false);
    }
  };

  const submitDemandPrediction = async (e) => {
    e.preventDefault();
    
    const demandFields = [
      { name: "year", min: 2000, max: 2030 },
      { name: "month", min: 1, max: 12 },
      { name: "dayofweek", min: 0, max: 6 },
      { name: "market" },
      { name: "district" },
      { name: "province" },
      { name: "category" },
      { name: "lag_demand_1", min: 0 },
      { name: "price", min: 0 }
    ];

    const validationError = validateInputs(demandInputs, demandFields);
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoadingDemand(true);
    setError("");
    setSuccess("");
    
    try {
      console.log("Sending demand prediction data:", demandInputs);
      const res = await axios.post(
        "https://nipunmanu-coconutdemand.hf.space/predict/demand",
        demandInputs,
        { 
          headers: { 
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          timeout: 10000
        }
      );
      console.log("Demand prediction response:", res.data);
      setDemandResult(res.data.predicted_demand_units);
      setSuccess("Demand predicted successfully!");
    } catch (error) {
      console.error("Full demand prediction error:", error);
      const errorMsg = error.response?.data?.error || 
                      error.message || 
                      "Demand prediction failed";
      setError(`API Error: ${errorMsg}`);
    } finally {
      setLoadingDemand(false);
    }
  };

  const priceFields = [
    { name: "year", placeholder: "Year (e.g. 2025)", type: "number" },
    { name: "month", placeholder: "Month (1-12)", type: "number", min: 1, max: 12 },
    { name: "day", placeholder: "Day (1-31)", type: "number", min: 1, max: 31 },
    { name: "province", placeholder: "Province (e.g. Western)", type: "text" },
    { name: "district", placeholder: "District (e.g. Colombo)", type: "text" },
    { name: "market", placeholder: "Market (e.g. Colombo Market)", type: "text" }
  ];

  const demandFields = [
    { name: "year", placeholder: "Year (e.g. 2025)", type: "number" },
    { name: "month", placeholder: "Month (1-12)", type: "number", min: 1, max: 12 },
    { name: "dayofweek", placeholder: "Day of Week (0=Mon, ..., 6=Sun)", type: "number", min: 0, max: 6 },
    { name: "market", placeholder: "Market (e.g. Colombo)", type: "text" },
    { name: "district", placeholder: "District (e.g. Colombo)", type: "text" },
    { name: "province", placeholder: "Province (e.g. Western)", type: "text" },
    { name: "category", placeholder: "Category (e.g. Vegetables)", type: "text" },
    { name: "lag_demand_1", placeholder: "Previous Day Demand (e.g. 850)", type: "number", min: 0 },
    { name: "price", placeholder: "Current Price (e.g. 100.0)", type: "number", step: "0.01", min: 0 }
  ];

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Coconut Supply Forecast</h2>

      {error && (
        <div style={styles.alertError}>
          ⚠️ {error}
        </div>
      )}

      {success && (
        <div style={styles.alertSuccess}>
          ✅ {success}
        </div>
      )}

      <div style={styles.formSection}>
        <h3 style={styles.sectionTitle}>Price Prediction</h3>
        <form onSubmit={submitPricePrediction} style={styles.form}>
          {priceFields.map((field) => (
            <div key={field.name} style={styles.inputGroup}>
              <label style={styles.label}>
                {field.placeholder}
                <input
                  name={field.name}
                  type={field.type}
                  value={priceInputs[field.name]}
                  onChange={handlePriceChange}
                  style={styles.input}
                  min={field.min}
                  max={field.max}
                  step={field.step}
                  required
                />
              </label>
            </div>
          ))}
          <button 
            type="submit" 
            style={loadingPrice ? styles.buttonDisabled : styles.button}
            disabled={loadingPrice}
          >
            {loadingPrice ? (
              <span style={styles.buttonText}>
                <span style={styles.spinner}>⏳</span> Predicting...
              </span>
            ) : (
              "Predict Price"
            )}
          </button>
        </form>
        {priceResult !== null && (
          <div style={styles.resultBox}>
            <h4 style={styles.resultTitle}>Prediction Result</h4>
            <p style={styles.resultText}>
              Predicted Price: <strong>Rs. {priceResult.toFixed(2)}</strong>
            </p>
          </div>
        )}
      </div>

      <div style={styles.formSection}>
        <h3 style={styles.sectionTitle}>Demand Prediction</h3>
        <form onSubmit={submitDemandPrediction} style={styles.form}>
          {demandFields.map((field) => (
            <div key={field.name} style={styles.inputGroup}>
              <label style={styles.label}>
                {field.placeholder}
                <input
                  name={field.name}
                  type={field.type}
                  value={demandInputs[field.name]}
                  onChange={handleDemandChange}
                  style={styles.input}
                  min={field.min}
                  max={field.max}
                  step={field.step}
                  required
                />
              </label>
            </div>
          ))}
          <button 
            type="submit" 
            style={loadingDemand ? styles.buttonDisabled : styles.button}
            disabled={loadingDemand}
          >
            {loadingDemand ? (
              <span style={styles.buttonText}>
                <span style={styles.spinner}>⏳</span> Predicting...
              </span>
            ) : (
              "Predict Demand"
            )}
          </button>
        </form>
        {demandResult !== null && (
          <div style={styles.resultBox}>
            <h4 style={styles.resultTitle}>Prediction Result</h4>
            <p style={styles.resultText}>
              Predicted Demand: <strong>{Math.round(demandResult)} units</strong>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "800px",
    margin: "0 auto",
    padding: "2rem",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    color: "#333",
  },
  title: {
    textAlign: "center",
    color: "#2c5a2e",
    marginBottom: "2rem",
    fontSize: "2rem",
  },
  formSection: {
    backgroundColor: "#f8f9fa",
    borderRadius: "8px",
    padding: "1.5rem",
    marginBottom: "2rem",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  },
  sectionTitle: {
    color: "#2c5a2e",
    marginBottom: "1.5rem",
    fontSize: "1.5rem",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  inputGroup: {
    marginBottom: "0.5rem",
  },
  label: {
    display: "block",
    marginBottom: "0.5rem",
    fontWeight: "500",
    color: "#495057",
  },
  input: {
    width: "100%",
    padding: "0.75rem",
    border: "1px solid #ced4da",
    borderRadius: "4px",
    fontSize: "1rem",
    transition: "border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out",
    ":focus": {
      borderColor: "#80bdff",
      outline: "0",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,0.25)",
    },
  },
  button: {
    backgroundColor: "#28a745",
    color: "white",
    border: "none",
    padding: "0.75rem",
    borderRadius: "4px",
    fontSize: "1rem",
    fontWeight: "500",
    cursor: "pointer",
    transition: "background-color 0.15s ease-in-out",
    ":hover": {
      backgroundColor: "#218838",
    },
  },
  buttonDisabled: {
    backgroundColor: "#6c757d",
    color: "white",
    border: "none",
    padding: "0.75rem",
    borderRadius: "4px",
    fontSize: "1rem",
    fontWeight: "500",
    cursor: "not-allowed",
  },
  buttonText: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.5rem",
  },
  spinner: {
    animation: "spin 1s linear infinite",
  },
  alertError: {
    backgroundColor: "#f8d7da",
    color: "#721c24",
    padding: "1rem",
    borderRadius: "4px",
    marginBottom: "1rem",
    border: "1px solid #f5c6cb",
  },
  alertSuccess: {
    backgroundColor: "#d4edda",
    color: "#155724",
    padding: "1rem",
    borderRadius: "4px",
    marginBottom: "1rem",
    border: "1px solid #c3e6cb",
  },
  resultBox: {
    backgroundColor: "#e2e3e5",
    padding: "1rem",
    borderRadius: "4px",
    marginTop: "1rem",
  },
  resultTitle: {
    marginTop: "0",
    color: "#383d41",
    fontSize: "1.1rem",
  },
  resultText: {
    marginBottom: "0",
    fontSize: "1rem",
  },
};

export default Predictions;