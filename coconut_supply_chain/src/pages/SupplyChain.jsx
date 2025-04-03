import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";

function SupplyChain() {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:5000/supply-chain-data")
      .then(response => {
        const data = response.data;
        setChartData({
          labels: data.map(item => item.location),
          datasets: [{
            label: "Coconut Supply",
            data: data.map(item => item.quantity),
            backgroundColor: "rgba(75, 192, 192, 0.6)"
          }]
        });
      })
      .catch(error => console.error("Error fetching data:", error));
  }, []);

  return (
    <div style={styles.container}>
      <h2>Supply Chain Visualization</h2>
      {chartData ? <Bar data={chartData} /> : <p>Loading chart...</p>}
    </div>
  );
}

const styles = {
  container: { padding: "20px", textAlign: "center" }
};

export default SupplyChain;
