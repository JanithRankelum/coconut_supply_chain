import { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./pages/Home";
import SupplyChain from "./pages/SupplyChain";
import Predictions from "./pages/Predictions";
import DataInput from "./pages/DataInput";
import AboutUs from "./pages/AboutUs";
import Login from "./auth/Login";
import Register from "./auth/Register";
import ForgotPassword from "./auth/ForgotPassword"; // optional if you're using it

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Router>
        <div style={styles.appContainer}>
          {/* Navigation Bar */}
          <nav style={styles.navbar}>
            <ul style={styles.navList}>
              <li style={styles.navItem}>
                <Link to="/" style={styles.link}>Home</Link>
              </li>
              <li style={styles.navItem}>
                <Link to="/supply-chain" style={styles.link}>Supply Chain</Link>
              </li>
              <li style={styles.navItem}>
                <Link to="/predictions" style={styles.link}>Predictions</Link>
              </li>
              <li style={styles.navItem}>
                <Link to="/data-input" style={styles.link}>Data Input</Link>
              </li>
              <li style={styles.navItem}>
                <Link to="/about-us" style={styles.link}>About Us</Link>
              </li>
             
            </ul>
          </nav>

          {/* Main Content Area */}
          <main style={styles.mainContent}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/supply-chain" element={<SupplyChain />} />
              <Route path="/predictions" element={<Predictions />} />
              <Route path="/data-input" element={<DataInput />} />
              <Route path="/about-us" element={<AboutUs />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="*" element={<div>Page Not Found</div>} />
            </Routes>
          </main>
        </div>
      </Router>
    </>
  );
}

const styles = {
  appContainer: {
    background: "#f4f4f4",
    minHeight: "100vw",
    display: "flex",
    flexDirection: "column",
    margin: "0",
  },
  navbar: {
    background: "#2c5a2e",
    padding: "1rem 2rem",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
  },
  navList: {
    listStyle: "none",
    display: "flex",
    gap: "2rem",
    padding: 0,
    margin: 0,
    alignItems: "center"
  },
  navItem: {
    padding: "0.5rem 0"
  },
  link: {
    color: "#fff",
    textDecoration: "none",
    fontSize: "1rem",
    fontWeight: "500",
    padding: "0.5rem 1rem",
    borderRadius: "4px",
    transition: "background-color 0.3s ease",
    ":hover": {
      backgroundColor: "rgba(255,255,255,0.1)"
    }
  },
  mainContent: {
    flex: 1,
    padding: "2rem"
  }
};

export default App;
