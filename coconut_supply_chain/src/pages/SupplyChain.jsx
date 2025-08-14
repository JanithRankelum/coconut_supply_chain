import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar, Line, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

function SupplyChain() {
  const [data, setData] = useState({
    priceTrend: null,
    supplyDemandGap: null,
    costProfit: null,
    exportOpportunity: null,
    transportation: null
  });
  
  const [loading, setLoading] = useState({
    priceTrend: true,
    supplyDemandGap: true,
    costProfit: true,
    exportOpportunity: true,
    transportation: true
  });
  
  const [error, setError] = useState(null);

  // Base URL for your Hugging Face Space
  const API_BASE_URL = "https://nipunmanu-realtime-coconut-dashboard.hf.space";

  useEffect(() => {
    // Fetch all data endpoints
    const fetchData = async () => {
      try {
        const endpoints = [
          { key: "priceTrend", url: "/api/price_trend" },
          { key: "supplyDemandGap", url: "/api/supply_demand_gap" },
          { key: "costProfit", url: "/api/cost_profit_optimization" },
          { key: "exportOpportunity", url: "/api/export_opportunity" },
          { key: "transportation", url: "/api/transportation" }
        ];

        const promises = endpoints.map(async ({ key, url }) => {
          try {
            const response = await axios.get(`${API_BASE_URL}${url}`);
            setData(prev => ({ ...prev, [key]: response.data }));
            setLoading(prev => ({ ...prev, [key]: false }));
          } catch (err) {
            console.error(`Error fetching ${key}:`, err);
            setError(`Failed to load ${key.replace(/([A-Z])/g, ' $1').toLowerCase()} data`);
            setLoading(prev => ({ ...prev, [key]: false }));
          }
        });

        await Promise.all(promises);
      } catch (err) {
        console.error("Error in data fetching:", err);
        setError("Failed to initialize dashboard data");
      }
    };

    fetchData();
  }, []);

  // Chart preparation functions
  const preparePriceTrendChart = () => ({
    labels: data.priceTrend?.map(item => item.date) || [],
    datasets: [{
      label: "Average Price (LKR)",
      data: data.priceTrend?.map(item => item.price) || [],
      borderColor: "rgb(75, 192, 192)",
      backgroundColor: "rgba(75, 192, 192, 0.5)",
      tension: 0.1
    }]
  });

  const prepareSupplyDemandChart = () => {
    if (!data.supplyDemandGap) return { labels: [], datasets: [] };
    
    // Aggregate by market
    const marketData = {};
    data.supplyDemandGap.forEach(item => {
      if (!marketData[item.market]) {
        marketData[item.market] = { supply: 0, demand: 0 };
      }
      marketData[item.market].supply += item.supply_quantity;
      marketData[item.market].demand += item.demand_forecast_units;
    });
    
    const markets = Object.keys(marketData);
    
    return {
      labels: markets,
      datasets: [
        {
          label: "Supply Quantity",
          data: markets.map(market => marketData[market].supply),
          backgroundColor: "rgba(54, 162, 235, 0.7)"
        },
        {
          label: "Demand Forecast",
          data: markets.map(market => marketData[market].demand),
          backgroundColor: "rgba(255, 99, 132, 0.7)"
        }
      ]
    };
  };

  const prepareProfitChart = () => ({
    labels: data.costProfit?.map(item => `${item.market} (${item.province})`) || [],
    datasets: [{
      label: "Profit per Unit (LKR)",
      data: data.costProfit?.map(item => item.profit_per_unit) || [],
      backgroundColor: "rgba(153, 102, 255, 0.7)"
    }]
  });

  const prepareExportChart = () => {
    if (!data.exportOpportunity) return { labels: [], datasets: [] };
    
    const provinceData = {};
    data.exportOpportunity.forEach(item => {
      provinceData[item.province] = (provinceData[item.province] || 0) + item.export_quantity;
    });
    
    return {
      labels: Object.keys(provinceData),
      datasets: [{
        data: Object.values(provinceData),
        backgroundColor: [
          "#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF",
          "#FF9F40", "#8AC24A", "#607D8B", "#E91E63", "#9C27B0"
        ]
      }]
    };
  };

  const prepareTransportationChart = () => ({
    labels: data.transportation?.map(item => `${item.market} (${item.province})`) || [],
    datasets: [{
      label: "Transport Cost (LKR/unit)",
      data: data.transportation?.map(item => item.transport_cost_lkr_per_unit) || [],
      backgroundColor: "rgba(255, 159, 64, 0.7)"
    }]
  });

  // Data tables for detailed views
  const renderDataTable = (title, data, columns) => (
    <div style={styles.tableContainer}>
      <h3>{title}</h3>
      <div style={styles.scrollContainer}>
        <table style={styles.table}>
          <thead>
            <tr>
              {columns.map(col => (
                <th key={col} style={styles.th}>{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data?.map((row, i) => (
              <tr key={i}>
                {columns.map(col => (
                  <td key={col} style={styles.td}>
                    {typeof row[col] === 'number' ? row[col].toFixed(2) : row[col]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Sri Lanka Coconut Supply Chain Analytics</h1>
      
      {error && <div style={styles.error}>{error}</div>}
      
      <div style={styles.grid}>
        {/* Price Trend */}
        <div style={styles.card}>
          <h2>Price Trend Analysis</h2>
          {loading.priceTrend ? (
            <p>Loading price data...</p>
          ) : (
            <>
              <Line 
                data={preparePriceTrendChart()} 
                options={{
                  responsive: true,
                  plugins: {
                    legend: { position: "top" },
                    title: { display: true, text: "Monthly Average Coconut Prices" }
                  }
                }}
              />
              {renderDataTable("Price Trend Data", data.priceTrend, ["date", "price"])}
            </>
          )}
        </div>
        
        {/* Supply-Demand Gap */}
        <div style={styles.card}>
          <h2>Supply-Demand Analysis</h2>
          {loading.supplyDemandGap ? (
            <p>Loading supply-demand data...</p>
          ) : (
            <>
              <Bar 
                data={prepareSupplyDemandChart()} 
                options={{
                  responsive: true,
                  plugins: {
                    legend: { position: "top" },
                    title: { display: true, text: "Market Supply vs Demand" }
                  },
                  scales: { y: { beginAtZero: true } }
                }}
              />
              {renderDataTable("Supply-Demand Gap", data.supplyDemandGap, 
                ["date", "province", "market", "supply_quantity", "demand_forecast_units", "gap"])}
            </>
          )}
        </div>
        
        {/* Cost-Profit Optimization */}
        <div style={styles.card}>
          <h2>Cost-Profit Analysis</h2>
          {loading.costProfit ? (
            <p>Loading cost-profit data...</p>
          ) : (
            <>
              <Bar 
                data={prepareProfitChart()} 
                options={{
                  responsive: true,
                  plugins: {
                    legend: { position: "top" },
                    vertical: true,
                    title: { display: true, text: "Profit per Unit by Market" }
                  },
                  scales: { y: { beginAtZero: true } }
                }}
              />
              {renderDataTable("Cost-Profit Data", data.costProfit, 
                ["date", "province", "market", "price", "total_cost", "profit_per_unit"])}
            </>
          )}
        </div>
        
        {/* Export Opportunity */}
        <div style={styles.card}>
          <h2>Export Opportunities</h2>
          {loading.exportOpportunity ? (
            <p>Loading export data...</p>
          ) : (
            <>
              <Pie 
                data={prepareExportChart()} 
                options={{
                  responsive: true,
                  plugins: {
                    legend: { position: "right" },
                    title: { display: true, text: "Export Quantity by Province" }
                  }
                }}
              />
              {renderDataTable("Export Opportunities", data.exportOpportunity, 
                ["date", "province", "market", "commodity", "export_quantity"])}
            </>
          )}
        </div>
        
        
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
    maxWidth: "1400px",
    margin: "0 auto",
    fontFamily: "Arial, sans-serif",
    color: "#333"
  },
  header: {
    textAlign: "center",
    marginBottom: "30px",
    color: "#2c3e50"
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(500px, 1fr))",
    gap: "20px"
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: "8px",
    padding: "20px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
    marginBottom: "20px"
  },
  error: {
    color: "#e74c3c",
    backgroundColor: "#fadbd8",
    padding: "10px",
    borderRadius: "4px",
    marginBottom: "20px",
    textAlign: "center"
  },
  tableContainer: {
    marginTop: "20px",
    maxHeight: "300px",
    overflow: "hidden"
  },
  scrollContainer: {
    maxHeight: "250px",
    overflowY: "auto",
    marginTop: "10px",
    border: "1px solid #eee"
  },
  table: {
    width: "100%",
    borderCollapse: "collapse"
  },
  th: {
    backgroundColor: "#f2f2f2",
    padding: "10px",
    textAlign: "left",
    position: "sticky",
    top: 0
  },
  td: {
    padding: "8px 10px",
    borderBottom: "1px solid #eee"
  }
};

export default SupplyChain;