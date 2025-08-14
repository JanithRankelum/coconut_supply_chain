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
import { FiRefreshCw, FiAlertCircle, FiInfo, FiTrendingUp, FiBox, FiDollarSign, FiGlobe, FiTruck } from "react-icons/fi";

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
  const [lastUpdated, setLastUpdated] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");

  // Base URL for your Hugging Face Space
  const API_BASE_URL = "https://nipunmanu-realtime-coconut-dashboard.hf.space";

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
      setLastUpdated(new Date());
      setError(null);
    } catch (err) {
      console.error("Error in data fetching:", err);
      setError("Failed to initialize dashboard data");
    }
  };

  useEffect(() => {
    fetchData();
    
    // Set up auto-refresh every 5 minutes
    const interval = setInterval(fetchData, 300000);
    return () => clearInterval(interval);
  }, []);

  // Chart preparation functions
  const preparePriceTrendChart = () => ({
    labels: data.priceTrend?.map(item => item.date) || [],
    datasets: [{
      label: "Average Price (LKR)",
      data: data.priceTrend?.map(item => item.price) || [],
      borderColor: "#4f46e5",
      backgroundColor: "rgba(79, 70, 229, 0.1)",
      borderWidth: 2,
      tension: 0.3,
      fill: true
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
          backgroundColor: "#10b981",
          borderRadius: 4
        },
        {
          label: "Demand Forecast",
          data: markets.map(market => marketData[market].demand),
          backgroundColor: "#3b82f6",
          borderRadius: 4
        }
      ]
    };
  };

  const prepareProfitChart = () => ({
    labels: data.costProfit?.map(item => `${item.market}`) || [],
    datasets: [{
      label: "Profit per Unit (LKR)",
      data: data.costProfit?.map(item => item.profit_per_unit) || [],
      backgroundColor: data.costProfit?.map(item => 
        item.profit_per_unit > 0 ? "#10b981" : "#ef4444"
      ),
      borderRadius: 4
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
          "#4f46e5", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6",
          "#ec4899", "#14b8a6", "#f97316", "#64748b", "#06b6d4"
        ],
        borderWidth: 1
      }]
    };
  };

  const prepareTransportationChart = () => ({
    labels: data.transportation?.map(item => `${item.market}`) || [],
    datasets: [{
      label: "Transport Cost (LKR/unit)",
      data: data.transportation?.map(item => item.transport_cost_lkr_per_unit) || [],
      backgroundColor: data.transportation?.map(item => 
        `hsl(${Math.floor(item.transport_cost_lkr_per_unit * 10)}, 80%, 60%)`
      ),
      borderRadius: 4
    }]
  });

  // Summary cards
  const SummaryCard = ({ icon, title, value, change, isPositive }) => (
    <div style={styles.summaryCard}>
      <div style={styles.summaryIcon}>{icon}</div>
      <div style={styles.summaryContent}>
        <h3 style={styles.summaryTitle}>{title}</h3>
        <p style={styles.summaryValue}>{value}</p>
        <p style={{ 
          ...styles.summaryChange, 
          color: isPositive ? "#10b981" : "#ef4444" 
        }}>
          {change} {isPositive ? '↑' : '↓'}
        </p>
      </div>
    </div>
  );

  // Data tables for detailed views
  const renderDataTable = (title, data, columns) => (
    <div style={styles.tableContainer}>
      <h3 style={styles.tableTitle}>{title}</h3>
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

  // Calculate summary metrics
  const calculateSummary = () => {
    const priceChange = data.priceTrend && data.priceTrend.length >= 2 
      ? ((data.priceTrend[data.priceTrend.length - 1].price - 
          data.priceTrend[data.priceTrend.length - 2].price) / 
          data.priceTrend[data.priceTrend.length - 2].price * 100).toFixed(1)
      : 0;
      
    const totalSupply = data.supplyDemandGap?.reduce((sum, item) => sum + item.supply_quantity, 0) || 0;
    const totalDemand = data.supplyDemandGap?.reduce((sum, item) => sum + item.demand_forecast_units, 0) || 0;
    const gapPercentage = totalDemand > 0 ? ((totalDemand - totalSupply) / totalDemand * 100).toFixed(1) : 0;
    
    const avgProfit = data.costProfit?.reduce((sum, item) => sum + item.profit_per_unit, 0) / data.costProfit?.length || 0;
    
    const totalExports = data.exportOpportunity?.reduce((sum, item) => sum + item.export_quantity, 0) || 0;
    
    return {
      currentPrice: data.priceTrend?.[data.priceTrend.length - 1]?.price.toFixed(2) || 'N/A',
      priceChange,
      totalSupply: totalSupply.toLocaleString(),
      totalDemand: totalDemand.toLocaleString(),
      gapPercentage,
      avgProfit: avgProfit.toFixed(2),
      totalExports: totalExports.toLocaleString()
    };
  };

  const summary = calculateSummary();

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <div>
          <h1 style={styles.title}>Sri Lanka Coconut Supply Chain Dashboard</h1>
          <p style={styles.subtitle}>Real-time analytics for coconut market optimization</p>
        </div>
        <div style={styles.headerActions}>
          <button onClick={fetchData} style={styles.refreshButton}>
            <FiRefreshCw style={{ marginRight: 8 }} />
            Refresh Data
          </button>
          {lastUpdated && (
            <p style={styles.lastUpdated}>
              Last updated: {lastUpdated.toLocaleTimeString()}
            </p>
          )}
        </div>
      </header>
      
      {error && (
        <div style={styles.error}>
          <FiAlertCircle style={{ marginRight: 8 }} />
          {error}
        </div>
      )}
      
      <div style={styles.tabs}>
        <button 
          style={{ 
            ...styles.tabButton, 
            ...(activeTab === "overview" ? styles.activeTab : {}) 
          }}
          onClick={() => setActiveTab("overview")}
        >
          Overview
        </button>
        <button 
          style={{ 
            ...styles.tabButton, 
            ...(activeTab === "detailed" ? styles.activeTab : {}) 
          }}
          onClick={() => setActiveTab("detailed")}
        >
          Detailed Analysis
        </button>
      </div>
      
      {activeTab === "overview" ? (
        <>
          <div style={styles.summaryGrid}>
            <SummaryCard 
              icon={<FiDollarSign size={24} />}
              title="Current Price (LKR)"
              value={summary.currentPrice}
              change={`${summary.priceChange}%`}
              isPositive={summary.priceChange >= 0}
            />
            <SummaryCard 
              icon={<FiBox size={24} />}
              title="Supply-Demand Gap"
              value={`${summary.gapPercentage}%`}
              change={`${summary.totalSupply} / ${summary.totalDemand}`}
              isPositive={summary.gapPercentage <= 0}
            />
            <SummaryCard 
              icon={<FiTrendingUp size={24} />}
              title="Avg Profit (LKR)"
              value={summary.avgProfit}
              change={parseFloat(summary.avgProfit) >= 0 ? "Positive" : "Negative"}
              isPositive={parseFloat(summary.avgProfit) >= 0}
            />
            <SummaryCard 
              icon={<FiGlobe size={24} />}
              title="Total Exports"
              value={summary.totalExports}
              change="This Month"
              isPositive={true}
            />
          </div>
          
          <div style={styles.chartGrid}>
            <div style={styles.chartCard}>
              <div style={styles.chartHeader}>
                <h2 style={styles.chartTitle}>
                  <FiTrendingUp style={{ marginRight: 8 }} />
                  Price Trend Analysis
                </h2>
                <div style={styles.chartLegend}>
                  <div style={styles.legendItem}>
                    <div style={{ ...styles.legendColor, backgroundColor: "#4f46e5" }}></div>
                    <span>Average Price</span>
                  </div>
                </div>
              </div>
              {loading.priceTrend ? (
                <div style={styles.loading}>Loading price data...</div>
              ) : (
                <Line 
                  data={preparePriceTrendChart()} 
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: { display: false },
                      tooltip: {
                        mode: 'index',
                        intersect: false
                      }
                    },
                    scales: {
                      x: { grid: { display: false } },
                      y: { 
                        grid: { color: "#e5e7eb" },
                        beginAtZero: false 
                      }
                    }
                  }}
                  height={300}
                />
              )}
            </div>
            
            <div style={styles.chartCard}>
              <div style={styles.chartHeader}>
                <h2 style={styles.chartTitle}>
                  <FiBox style={{ marginRight: 8 }} />
                  Supply-Demand Analysis
                </h2>
                <div style={styles.chartLegend}>
                  <div style={styles.legendItem}>
                    <div style={{ ...styles.legendColor, backgroundColor: "#10b981" }}></div>
                    <span>Supply</span>
                  </div>
                  <div style={styles.legendItem}>
                    <div style={{ ...styles.legendColor, backgroundColor: "#3b82f6" }}></div>
                    <span>Demand</span>
                  </div>
                </div>
              </div>
              {loading.supplyDemandGap ? (
                <div style={styles.loading}>Loading supply-demand data...</div>
              ) : (
                <Bar 
                  data={prepareSupplyDemandChart()} 
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: { display: false }
                    },
                    scales: {
                      x: { grid: { display: false } },
                      y: { 
                        grid: { color: "#e5e7eb" },
                        beginAtZero: true 
                      }
                    }
                  }}
                  height={300}
                />
              )}
            </div>
            
            <div style={styles.chartCard}>
              <div style={styles.chartHeader}>
                <h2 style={styles.chartTitle}>
                  <FiDollarSign style={{ marginRight: 8 }} />
                  Cost-Profit Analysis
                </h2>
                <div style={styles.chartLegend}>
                  <div style={styles.legendItem}>
                    <div style={{ ...styles.legendColor, backgroundColor: "#10b981" }}></div>
                    <span>Profit</span>
                  </div>
                  <div style={styles.legendItem}>
                    <div style={{ ...styles.legendColor, backgroundColor: "#ef4444" }}></div>
                    <span>Loss</span>
                  </div>
                </div>
              </div>
              {loading.costProfit ? (
                <div style={styles.loading}>Loading cost-profit data...</div>
              ) : (
                <Bar 
                  data={prepareProfitChart()} 
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: { display: false }
                    },
                    scales: {
                      x: { grid: { display: false } },
                      y: { 
                        grid: { color: "#e5e7eb" },
                        beginAtZero: false 
                      }
                    }
                  }}
                  height={300}
                />
              )}
            </div>
            
            <div style={styles.chartCard}>
              <div style={styles.chartHeader}>
                <h2 style={styles.chartTitle}>
                  <FiGlobe style={{ marginRight: 8 }} />
                  Export Opportunities
                </h2>
              </div>
              {loading.exportOpportunity ? (
                <div style={styles.loading}>Loading export data...</div>
              ) : (
                <div style={styles.pieContainer}>
                  <Pie 
                    data={prepareExportChart()} 
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: {
                        legend: { 
                          position: 'right',
                          labels: {
                            boxWidth: 12,
                            padding: 16
                          }
                        }
                      }
                    }}
                    height={250}
                  />
                </div>
              )}
            </div>
          </div>
        </>
      ) : (
        <div style={styles.detailedView}>
          <div style={styles.detailedSection}>
            <h2 style={styles.sectionTitle}>
              <FiTrendingUp style={{ marginRight: 8 }} />
              Price Trend Data
            </h2>
            {renderDataTable("Detailed Price Data", data.priceTrend, ["date", "price"])}
          </div>
          
          <div style={styles.detailedSection}>
            <h2 style={styles.sectionTitle}>
              <FiBox style={{ marginRight: 8 }} />
              Supply-Demand Data
            </h2>
            {renderDataTable("Market Supply vs Demand", data.supplyDemandGap, 
              ["date", "province", "market", "supply_quantity", "demand_forecast_units", "gap"])}
          </div>
          
          <div style={styles.detailedSection}>
            <h2 style={styles.sectionTitle}>
              <FiDollarSign style={{ marginRight: 8 }} />
              Cost-Profit Data
            </h2>
            {renderDataTable("Market Profitability", data.costProfit, 
              ["date", "province", "market", "price", "total_cost", "profit_per_unit"])}
          </div>
          
          <div style={styles.detailedSection}>
            <h2 style={styles.sectionTitle}>
              <FiGlobe style={{ marginRight: 8 }} />
              Export Data
            </h2>
            {renderDataTable("Export Opportunities", data.exportOpportunity, 
              ["date", "province", "market", "commodity", "export_quantity"])}
          </div>
          
          <div style={styles.detailedSection}>
            <h2 style={styles.sectionTitle}>
              <FiTruck style={{ marginRight: 8 }} />
              Transportation Data
            </h2>
            {renderDataTable("Transportation Costs", data.transportation, 
              ["date", "province", "market", "transport_cost_lkr_per_unit"])}
          </div>
        </div>
      )}
      
      <footer style={styles.footer}>
        <p>© {new Date().getFullYear()} Sri Lanka Coconut Supply Chain Analytics</p>
        <p style={styles.footerNote}>
          <FiInfo style={{ marginRight: 4 }} />
          Data is updated automatically every 5 minutes
        </p>
      </footer>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#f9fafb",
    padding: "24px",
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    color: "#111827"
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "24px",
    flexWrap: "wrap",
    gap: "16px"
  },
  title: {
    fontSize: "24px",
    fontWeight: "700",
    margin: "0",
    color: "#111827"
  },
  subtitle: {
    fontSize: "14px",
    margin: "4px 0 0",
    color: "#6b7280"
  },
  headerActions: {
    display: "flex",
    alignItems: "center",
    gap: "16px"
  },
  refreshButton: {
    display: "flex",
    alignItems: "center",
    padding: "8px 16px",
    backgroundColor: "#4f46e5",
    color: "white",
    border: "none",
    borderRadius: "6px",
    fontWeight: "500",
    cursor: "pointer",
    transition: "background-color 0.2s",
    ":hover": {
      backgroundColor: "#4338ca"
    }
  },
  lastUpdated: {
    margin: "0",
    fontSize: "14px",
    color: "#6b7280"
  },
  error: {
    display: "flex",
    alignItems: "center",
    padding: "12px 16px",
    backgroundColor: "#fee2e2",
    color: "#b91c1c",
    borderRadius: "6px",
    marginBottom: "24px",
    fontWeight: "500"
  },
  tabs: {
    display: "flex",
    borderBottom: "1px solid #e5e7eb",
    marginBottom: "24px"
  },
  tabButton: {
    padding: "8px 16px",
    backgroundColor: "transparent",
    border: "none",
    borderBottom: "2px solid transparent",
    color: "#6b7280",
    fontWeight: "500",
    cursor: "pointer",
    transition: "all 0.2s"
  },
  activeTab: {
    color: "#4f46e5",
    borderBottomColor: "#4f46e5"
  },
  summaryGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: "16px",
    marginBottom: "24px"
  },
  summaryCard: {
    backgroundColor: "white",
    borderRadius: "8px",
    padding: "16px",
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
    display: "flex",
    gap: "16px"
  },
  summaryIcon: {
    width: "48px",
    height: "48px",
    borderRadius: "50%",
    backgroundColor: "#eef2ff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#4f46e5",
    flexShrink: 0
  },
  summaryContent: {
    flex: 1
  },
  summaryTitle: {
    fontSize: "14px",
    fontWeight: "500",
    color: "#6b7280",
    margin: "0 0 4px"
  },
  summaryValue: {
    fontSize: "20px",
    fontWeight: "600",
    margin: "0 0 4px",
    color: "#111827"
  },
  summaryChange: {
    fontSize: "12px",
    margin: "0",
    display: "flex",
    alignItems: "center"
  },
  chartGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
    gap: "20px",
    marginBottom: "24px"
  },
  chartCard: {
    backgroundColor: "white",
    borderRadius: "8px",
    padding: "16px",
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
  },
  chartHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "16px",
    flexWrap: "wrap",
    gap: "8px"
  },
  chartTitle: {
    fontSize: "16px",
    fontWeight: "600",
    margin: "0",
    display: "flex",
    alignItems: "center"
  },
  chartLegend: {
    display: "flex",
    gap: "16px"
  },
  legendItem: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    fontSize: "12px"
  },
  legendColor: {
    width: "12px",
    height: "12px",
    borderRadius: "4px"
  },
  loading: {
    height: "300px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#6b7280"
  },
  pieContainer: {
    height: "300px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  detailedView: {
    display: "flex",
    flexDirection: "column",
    gap: "24px"
  },
  detailedSection: {
    backgroundColor: "white",
    borderRadius: "8px",
    padding: "16px",
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
  },
  sectionTitle: {
    fontSize: "18px",
    fontWeight: "600",
    margin: "0 0 16px",
    display: "flex",
    alignItems: "center"
  },
  tableContainer: {
    marginTop: "16px"
  },
  tableTitle: {
    fontSize: "14px",
    fontWeight: "500",
    color: "#6b7280",
    margin: "0 0 8px"
  },
  scrollContainer: {
    maxHeight: "400px",
    overflowY: "auto",
    border: "1px solid #e5e7eb",
    borderRadius: "6px"
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    fontSize: "14px"
  },
  th: {
    backgroundColor: "#f9fafb",
    padding: "12px 16px",
    textAlign: "left",
    position: "sticky",
    top: 0,
    fontWeight: "500",
    color: "#374151",
    borderBottom: "1px solid #e5e7eb"
  },
  td: {
    padding: "12px 16px",
    borderBottom: "1px solid #e5e7eb",
    color: "#4b5563"
  },
  footer: {
    marginTop: "32px",
    paddingTop: "16px",
    borderTop: "1px solid #e5e7eb",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    color: "#6b7280",
    fontSize: "14px"
  },
  footerNote: {
    margin: "0",
    display: "flex",
    alignItems: "center"
  }
};

export default SupplyChain;