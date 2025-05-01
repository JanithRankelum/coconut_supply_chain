import React from "react";

function AboutUs() {
  return (
    <div style={styles.container}>
      {/* Hero Section */}
      <section style={styles.heroSection}>
        <div style={styles.heroContent}>
          <h1 style={styles.title}>Revolutionizing Coconut Supply Chains</h1>
          <p style={styles.subtitle}>
            Leveraging AI and Machine Learning to transform traditional coconut supply chains into efficient, transparent ecosystems
          </p>
          <div style={styles.heroPattern}></div>
        </div>
      </section>

      {/* Main Content */}
      <div style={styles.contentWrapper}>
        {/* Mission Section */}
        <section style={styles.section}>
          <div style={styles.sectionHeader}>
            <h2 style={styles.sectionTitle}>Our Mission</h2>
            <div style={styles.titleUnderline}></div>
          </div>
          <div style={styles.missionContent}>
            <p style={styles.text}>
              We are transforming Sri Lanka's coconut industry through innovative technology and intelligent systems. Our smart Coconut Supply Chain Management System addresses inefficiencies and promotes transparency, sustainability, and profitability for all stakeholders.
            </p>
            
            <div style={styles.featureGrid}>
              <div style={styles.featureCard}>
                <div style={styles.featureIcon}>📊</div>
                <h3 style={styles.featureTitle}>Demand Forecasting</h3>
                <p style={styles.featureText}>Accurate predictions using advanced ML models</p>
              </div>
              
              <div style={styles.featureCard}>
                <div style={styles.featureIcon}>💰</div>
                <h3 style={styles.featureTitle}>Predictive Pricing</h3>
                <p style={styles.featureText}>Market-driven pricing analytics</p>
              </div>
              
              <div style={styles.featureCard}>
                <div style={styles.featureIcon}>📦</div>
                <h3 style={styles.featureTitle}>Inventory Management</h3>
                <p style={styles.featureText}>Optimized stock levels and reduced waste</p>
              </div>
              
              <div style={styles.featureCard}>
                <div style={styles.featureIcon}>🔍</div>
                <h3 style={styles.featureTitle}>Quality Control</h3>
                <p style={styles.featureText}>Real-time monitoring of product quality</p>
              </div>
            </div>
            
            <p style={styles.text}>
              Our platform provides an intuitive interface with role-based access and interactive dashboards that offer insights into supplier reliability, regional trends, and sustainability metrics. By connecting all stakeholders on a single digital platform, we ensure smooth coordination and data-driven decision-making.
            </p>
            
            <div style={styles.visionCard}>
              <h3 style={styles.visionTitle}>Our Vision</h3>
              <p style={styles.visionText}>
                A future where Sri Lanka's coconut industry is efficient, resilient, traceable, and globally respected - supporting economic growth in rural communities through sustainable agricultural practices.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section style={styles.contactSection}>
          <div style={styles.contactCard}>
            <h2 style={styles.contactTitle}>Get In Touch</h2>
            <p style={styles.contactText}>
              Interested in learning more about our Coconut Supply Chain Management solution?
            </p>
            
            <div style={styles.contactInfo}>
              <div style={styles.contactItem}>
                <span style={styles.contactIcon}>✉️</span>
                <a href="mailto:info@coconut-ml.com" style={styles.link}>info@coconut-ml.com</a>
              </div>
              
              <div style={styles.contactItem}>
                <span style={styles.contactIcon}>📱</span>
                <span>+94 77 360 1833</span>
              </div>
            </div>
            
            <button style={styles.contactButton}>Request a Demo</button>
          </div>
        </section>
      </div>
    </div>
  );
}

const styles = {
  container: {
    fontFamily: "'Poppins', sans-serif",
    color: "#333",
    lineHeight: 1.6,
    backgroundColor: "#f9f9f9",
    minHeight: "100vh"
  },
  
  // Hero Section
  heroSection: {
    background: "linear-gradient(135deg, #2c5a2e 0%, #4a8c4a 100%)",
    color: "white",
    padding: "5rem 2rem",
    position: "relative",
    overflow: "hidden"
  },
  heroContent: {
    maxWidth: "1200px",
    margin: "0 auto",
    position: "relative",
    zIndex: 2,
    textAlign: "center"
  },
  heroPattern: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage: "radial-gradient(rgba(255,255,255,0.1) 1px, transparent 1px)",
    backgroundSize: "20px 20px",
    opacity: 0.3,
    zIndex: 1
  },
  title: {
    fontSize: "2.8rem",
    fontWeight: 700,
    marginBottom: "1rem",
    lineHeight: 1.2
  },
  subtitle: {
    fontSize: "1.3rem",
    maxWidth: "700px",
    margin: "0 auto",
    opacity: 0.9
  },
  
  // Content Wrapper
  contentWrapper: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "3rem 2rem"
  },
  
  // Section Styling
  section: {
    marginBottom: "4rem",
    backgroundColor: "white",
    borderRadius: "12px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.05)",
    padding: "2.5rem",
    position: "relative",
    overflow: "hidden"
  },
  sectionHeader: {
    marginBottom: "2rem",
    textAlign: "center"
  },
  sectionTitle: {
    fontSize: "2rem",
    fontWeight: 600,
    color: "#2c5a2e",
    marginBottom: "0.5rem"
  },
  titleUnderline: {
    width: "80px",
    height: "4px",
    background: "linear-gradient(90deg, #2c5a2e, #4a8c4a)",
    margin: "0 auto",
    borderRadius: "2px"
  },
  text: {
    fontSize: "1.1rem",
    marginBottom: "1.5rem",
    color: "#555"
  },
  
  // Feature Grid
  featureGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "1.5rem",
    margin: "2.5rem 0"
  },
  featureCard: {
    backgroundColor: "#f8faf7",
    padding: "1.5rem",
    borderRadius: "8px",
    textAlign: "center",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    border: "1px solid #e0e6dd",
    ":hover": {
      transform: "translateY(-5px)",
      boxShadow: "0 10px 20px rgba(0,0,0,0.1)"
    }
  },
  featureIcon: {
    fontSize: "2.5rem",
    marginBottom: "1rem"
  },
  featureTitle: {
    fontSize: "1.3rem",
    fontWeight: 600,
    color: "#2c5a2e",
    marginBottom: "0.5rem"
  },
  featureText: {
    fontSize: "0.95rem",
    color: "#666"
  },
  
  // Vision Card
  visionCard: {
    backgroundColor: "#f0f5ee",
    borderLeft: "4px solid #2c5a2e",
    padding: "1.5rem",
    borderRadius: "0 8px 8px 0",
    margin: "2rem 0"
  },
  visionTitle: {
    fontSize: "1.4rem",
    fontWeight: 600,
    color: "#2c5a2e",
    marginBottom: "0.8rem"
  },
  visionText: {
    fontSize: "1.05rem",
    color: "#444"
  },
  
  // Contact Section
  contactSection: {
    marginTop: "3rem"
  },
  contactCard: {
    backgroundColor: "white",
    borderRadius: "12px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.05)",
    padding: "2.5rem",
    textAlign: "center",
    maxWidth: "800px",
    margin: "0 auto"
  },
  contactTitle: {
    fontSize: "1.8rem",
    fontWeight: 600,
    color: "#2c5a2e",
    marginBottom: "1rem"
  },
  contactText: {
    fontSize: "1.1rem",
    color: "#555",
    marginBottom: "2rem",
    maxWidth: "600px",
    marginLeft: "auto",
    marginRight: "auto"
  },
  contactInfo: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    marginBottom: "2rem"
  },
  contactItem: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.8rem",
    fontSize: "1.1rem"
  },
  contactIcon: {
    fontSize: "1.2rem"
  },
  link: {
    color: "#2c5a2e",
    textDecoration: "none",
    fontWeight: 500,
    transition: "color 0.2s ease",
    ":hover": {
      color: "#4a8c4a",
      textDecoration: "underline"
    }
  },
  contactButton: {
    backgroundColor: "#2c5a2e",
    color: "white",
    border: "none",
    padding: "0.8rem 2rem",
    fontSize: "1rem",
    fontWeight: 500,
    borderRadius: "50px",
    cursor: "pointer",
    transition: "all 0.3s ease",
    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
    ":hover": {
      backgroundColor: "#4a8c4a",
      transform: "translateY(-2px)",
      boxShadow: "0 6px 12px rgba(0,0,0,0.15)"
    }
  }
};

export default AboutUs;