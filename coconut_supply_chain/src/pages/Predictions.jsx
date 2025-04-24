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

  const handlePriceChange = (e) => {
    setPriceInputs({ ...priceInputs, [e.target.name]: e.target.value });
  };

  const handleDemandChange = (e) => {
    setDemandInputs({ ...demandInputs, [e.target.name]: e.target.value });
  };

  const submitPricePrediction = async () => {
    setLoadingPrice(true);
    setError("");
    try {
      const res = await axios.post(
        "https://nipunmanu-coconutpriceprediction.hf.space/predict/price",
        priceInputs,
        { headers: { "Content-Type": "application/json" } }
      );
      setPriceResult(res.data.predicted_price);
    } catch (error) {
      setError("Price prediction failed. Check inputs or API status.");
      console.error("Price prediction error:", error.response?.data || error.message);
    } finally {
      setLoadingPrice(false);
    }
  };

  const submitDemandPrediction = async () => {
    setLoadingDemand(true);
    setError("");
    try {
      const res = await axios.post(
        "https://nipunmanu-coconutdemand.hf.space/predict/demand",
        demandInputs,
        { headers: { "Content-Type": "application/json" } }
      );
      setDemandResult(res.data.predicted_demand_units);
    } catch (error) {
      setError("Demand prediction failed. Check inputs or API status.");
      console.error("Demand prediction error:", error.response?.data || error.message);
    } finally {
      setLoadingDemand(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2>Coconut Supply Forecast</h2>

      {error && <p style={styles.error}>{error}</p>}

      <div style={styles.formSection}>
        <h3>Price Prediction</h3>
        {[
          { name: "year", placeholder: "Year (e.g. 2025)" },
          { name: "month", placeholder: "Month (1 - 12)" },
          { name: "day", placeholder: "Day (1 - 31)" },
          { name: "province", placeholder: "Province (e.g. Western)" },
          { name: "district", placeholder: "District (e.g. Colombo)" },
          { name: "market", placeholder: "Market (e.g. Colombo Market)" }
        ].map((field) => (
          <input
            key={field.name}
            name={field.name}
            placeholder={field.placeholder}
            value={priceInputs[field.name]}
            onChange={handlePriceChange}
            style={styles.input}
            required
          />
        ))}
        <button onClick={submitPricePrediction} style={styles.button} disabled={loadingPrice}>
          {loadingPrice ? "Predicting..." : "Predict Price"}
        </button>
        {priceResult !== null && (
          <p><strong>Predicted Price:</strong> Rs. {priceResult}</p>
        )}
      </div>

      <div style={styles.formSection}>
        <h3>Demand Prediction</h3>
        {[
          { name: "year", placeholder: "Year (e.g. 2025)" },
          { name: "month", placeholder: "Month (1 - 12)" },
          { name: "dayofweek", placeholder: "Day of Week (0=Mon, ..., 6=Sun)" },
          { name: "market", placeholder: "Market (e.g. Colombo)" },
          { name: "district", placeholder: "District (e.g. Colombo)" },
          { name: "province", placeholder: "Province (e.g. Western)" },
          { name: "category", placeholder: "Category (e.g. Vegetables)" },
          { name: "lag_demand_1", placeholder: "Previous Day Demand (e.g. 850)" },
          { name: "price", placeholder: "Current Price (e.g. 100.0)" }
        ].map((field) => (
          <input
            key={field.name}
            name={field.name}
            placeholder={field.placeholder}
            value={demandInputs[field.name]}
            onChange={handleDemandChange}
            style={styles.input}
            required
          />
        ))}
        <button onClick={submitDemandPrediction} style={styles.button} disabled={loadingDemand}>
          {loadingDemand ? "Predicting..." : "Predict Demand"}
        </button>
        {demandResult !== null && (
          <p><strong>Predicted Demand:</strong> {demandResult} units</p>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
    textAlign: "center",
    fontFamily: "Arial, sans-serif",
    color: "#333"
  },
  formSection: {
    marginBottom: "40px",
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "10px",
    maxWidth: "500px",
    margin: "0 auto 40px auto"
  },
  input: {
    display: "block",
    margin: "10px auto",
    padding: "8px",
    width: "80%",
    borderRadius: "5px",
    border: "1px solid #ccc"
  },
  button: {
    marginTop: "10px",
    padding: "10px 20px",
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer"
  },
  error: {
    color: "red",
    marginBottom: "10px"
  }
};

export default Predictions;
