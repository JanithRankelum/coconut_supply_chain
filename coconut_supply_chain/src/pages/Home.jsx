import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import coc3 from "../assets/coc3.png";
import logo from "../assets/logo.png";
import coc2 from "../assets/coc2.png";
import { auth } from "../firebase";
import { getAuth, onAuthStateChanged, signOut, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import defaultProfile from "../assets/default-profile.png"; // Default profile image

function Home() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth).then(() => setUser(null));
  };

  // Google Sign-In Handler
  const handleGoogleSignIn = async () => {
    try {
      const auth = getAuth();
      const googleProvider = new GoogleAuthProvider();
      await signInWithPopup(auth, googleProvider);
      console.log("User signed in with Google!");
    } catch (err) {
      console.error("Google Sign-In Error:", err);
    }
  };

  // Email Sign-Up Handler
  const handleEmailSignUp = async (email, password) => {
    try {
      const auth = getAuth();
      await createUserWithEmailAndPassword(auth, email, password);
      console.log("User registered with email!");
    } catch (err) {
      console.error("Email Registration Error:", err);
    }
  };

  // Email Login Handler
  const handleEmailLogin = async (email, password) => {
    try {
      const auth = getAuth();
      await signInWithEmailAndPassword(auth, email, password);
      console.log("User logged in with email!");
    } catch (err) {
      console.error("Email Login Error:", err);
    }
  };

  // Password Reset Handler
  const handlePasswordReset = async (email) => {
    try {
      const auth = getAuth();
      await sendPasswordResetEmail(auth, email);
      console.log("Password reset email sent!");
    } catch (err) {
      console.error("Password Reset Error:", err);
    }
  };

  return (
    <div style={styles.container}>
      {/* Header Section */}
      <header style={styles.header}>
        <img src={logo} alt="Logo" style={styles.logo} />
        
        
        {/* Auth Section */}
        <div style={styles.authContainer}>
          {user ? (
            <div style={styles.profileContainer}>
              <img src={user.photoURL || defaultProfile} alt="Profile" style={styles.profilePic} />
              <span style={styles.userName}>{user.displayName || "User"}</span>
              <button onClick={handleLogout} style={styles.logoutBtn}>Logout</button>
            </div>
          ) : (
            <div style={styles.authLinks}>
              <Link to="/login" style={styles.authLink}>Login</Link>
              <Link to="/register" style={styles.authLink}>Register</Link>
            </div>
          )}
        </div>
      </header>
      
      {/* Hero Section */}
      <section style={styles.hero}>
        <h2 style={styles.sectionTitle}>COCONUT SUPPLY CHAIN ANALYTICS</h2>
        <p style={styles.heroText}>
          Our machine learning system optimizes 50% of coconut supply chain operations. 
          Predictive analytics help reduce waste and improve delivery times.
        </p>
        <div style={styles.features}>
          <div style={styles.featureItem}>
            <h3>Features</h3>
            <ul style={styles.featureList}>
              <li>Real-time Price Tracking</li>
              <li>Demand Forecasting</li>
              <li>Supply Quantity Analysis</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Company Section */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Our System</h2>
        <p style={styles.sectionText}>
          Advanced machine learning models analyze coconut supply chain data to optimize 
          inventory management, predict demand fluctuations, and streamline logistics 
          for maximum efficiency and sustainability.
        </p>
        <button style={styles.readMoreBtn}>READ MORE</button>
      </section>

      {/* Services Section */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>What We Analyze</h2>
        <div style={styles.servicesGrid}>
          <div style={styles.serviceItem}>Price Trend Analysis</div>
          <div style={styles.serviceItem}>Supply-Demand Gap Analysis</div>
          <div style={styles.serviceItem}>Cost-Profit Optimization</div>
          <div style={styles.serviceItem}>Export Opportunity Analysis</div>
          <div style={styles.serviceItem}>Geospatial Cost Analysis</div>
        </div>
      </section>

      {/* Footer */}
      <footer style={styles.footer}>
        <div style={styles.footerSection}>
          <h3>About</h3>
          <p>Our machine learning system transforms traditional coconut supply chains into data-driven operations.</p>
        </div>
        <div style={styles.footerSection}>
          <h3>Features</h3>
          <ul style={styles.footerList}>
            <li>Predictive Analytics</li>
            <li>Real-time Monitoring</li>
            <li>Quality Assessment</li>
          </ul>
        </div>
        <div style={styles.footerSection}>
          <h3>Contacts</h3>
          <ul style={styles.footerList}>
            <li>info@coconut-supply.com</li>
            <li>+94 77 360 1833</li>
            <li>Support: 24 Hours Services</li>
          </ul>
        </div>
        <div style={styles.copyright}>
          All Rights Reserved © Coconut Supply Chain Analytics
        </div>
      </footer>
    </div>
  );
}

const styles = {
  container: {
    fontFamily: "'Arial', sans-serif",
    color: "#333",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0px 0",
    borderBottom: "1px solid #eee",
  },
  logo: {
    height: "150px",
    width: "auto",
  },
  searchContainer: {
    display: "flex",
  },
  searchInput: {
    padding: "8px 15px",
    border: "1px solid #ddd",
    borderRadius: "4px",
    fontSize: "16px",
  },
  authContainer: {
    display: "flex",
    alignItems: "center",
  },
  profileContainer: {
    display: "flex",
    alignItems: "center",
  },
  profilePic: {
    height: "40px",
    width: "40px",
    borderRadius: "50%",
    marginRight: "10px",
  },
  userName: {
    fontSize: "16px",
    marginRight: "10px",
  },
  logoutBtn: {
    backgroundColor: "#f44336",
    color: "white",
    border: "none",
    padding: "5px 10px",
    borderRadius: "4px",
    cursor: "pointer",
  },
  authLinks: {
    display: "flex",
  },
  authLink: {
    textDecoration: "none",
    color: "#2c5a2e",
    marginLeft: "10px",
    fontSize: "16px",
  },
  hero: {
    background: `url(${coc3}) center/cover no-repeat`,
    padding: "40px 20px",
    textAlign: "center",
    marginBottom: "40px",
    color: "white", // Ensure text is visible on the image
    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)", // Improve readability
  },
  sectionTitle: {
    color: "rgb(19, 178, 127)",
    fontWeight: "bold",
    fontFamily: "'Arial', sans-serif",
    fontSize: "28px",
    marginBottom: "20px",
    textAlign: "center",
  },
  heroText: {
    fontSize: "18px",
    lineHeight: "1.6",
    maxWidth: "800px",
    margin: "0 auto 30px",
  },
  features: {
    display: "flex",
    justifyContent: "center",
    marginTop: "30px",
  },
  featureItem: {
    background: `url(${coc2}) center/cover no-repeat`,
    fontSize: "20px",
    fontWeight: "bold",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 2px 50px rgba(0,0,0,0.1)",
    width: "300px",
  },
  featureList: {
    textAlign: "left",
    paddingLeft: "20px",
  },
  section: {
    padding: "40px 20px",
    textAlign: "center",
    marginBottom: "30px",
  },
  sectionText: {
    fontSize: "16px",
    lineHeight: "1.6",
    maxWidth: "800px",
    margin: "0 auto 20px",
  },
  readMoreBtn: {
    background: "#2c5a2e",
    color: "white",
    border: "none",
    padding: "10px 25px",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "16px",
  },
  servicesGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "20px",
    maxWidth: "2000px",
    margin: "0 auto",
  },
  serviceItem: {
    background: "#f5f5f5",
    padding: "20px",
    borderRadius: "8px",
    textAlign: "center",
    fontWeight: "bold",
  },
  footer: {
    background: "#2c5a2e",
    color: "white",
    padding: "40px 20px 20px",
    marginTop: "40px",
  },
  footerSection: {
    display: "inline-block",
    verticalAlign: "top",
    width: "30%",
    padding: "0 15px",
    marginBottom: "20px",
  },
  footerList: {
    listStyle: "none",
    padding: 0,
    textAlign: "left",
  },
  copyright: {
    textAlign: "center",
    paddingTop: "20px",
    borderTop: "1px solid rgba(255,255,255,0.2)",
    marginTop: "20px",
    fontSize: "14px",
  }
};

export default Home;
