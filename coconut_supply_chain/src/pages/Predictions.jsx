import React, { useEffect, useState } from "react";
import axios from "axios";

function Predictions() {
  const [predictions, setPredictions] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:5000/predictions")
      .then(response => setPredictions(response.data))
      .catch(error => console.error("Error fetching predictions:", error));
  }, []);

  return (
    <div style={styles.container}>
      <h2>ML Predictions</h2>
      {predictions ? (
        <ul>
          {predictions.map((pred, index) => (
            <li key={index}>{pred.date}: Predicted demand - {pred.demand}</li>
          ))}
        </ul>
      ) : <p>Loading predictions...</p>}
    </div>
  );
}

const styles = {
  container: { padding: "20px", textAlign: "center" }
};

export default Predictions;
