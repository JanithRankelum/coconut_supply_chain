import React from "react";

function AboutUs() {
  return (
    <div style={styles.container}>
      <section style={styles.heroSection}>
        <h1 style={styles.title}>About Coconut Supply Chain Management</h1>
        <p style={styles.subtitle}>
          Leveraging Machine Learning to transform traditional coconut supply chains
        </p>
      </section>

      <section style={styles.contentSection}>
        <div style={styles.aboutCard}>
          <h2 style={styles.sectionTitle}>Our Mission</h2>
          <p style={styles.text}>
            We're revolutionizing the coconut industry by implementing advanced machine learning 
            models to optimize supply chain operations. Our system addresses key challenges in 
            demand forecasting, inventory management, quality control, and logistics.
          </p>
        </div>

       

        <div style={styles.contactCard}>
          <h2 style={styles.sectionTitle}>Contact Us</h2>
          <p style={styles.text}>
            For more information about our Coconut Supply Chain Management solution:
          </p>
          <p style={styles.contactInfo}>
            Email: <a href="mailto:info@coconut-ml.com" style={styles.link}>info@coconut-ml.com</a>
          </p>
          <p style={styles.contactInfo}>
            Phone: +94 77 360 1833
          </p>
        </div>
      </section>
    </div>
  );
}

const styles = {
  container: {
    justyfyContent: "center",
    alignment: "center",
    fontFamily: "'Arial', sans-serif",
    color: "#333",
    margin: "0",
    padding: "0 20px"
  },
  heroSection: {
    background: "#f5f7f0",
    padding: "3rem 2rem",
    textAlign: "center",
    marginBottom: "2rem",
    borderRadius: "8px"
  },
  title: {
    color: "#2c5a2e",
    fontSize: "2.5rem",
    marginBottom: "1rem"
  },
  subtitle: {
    fontSize: "1.2rem",
    color: "#666"
  },
  contentSection: {
    display: "flex",
    flexDirection: "column",
    gap: "2rem"
  },
  aboutCard: {
    background: "#fff",
    padding: "2rem",
    borderRadius: "8px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.05)"
  },
  sectionTitle: {
    color: "#2c5a2e",
    fontSize: "1.8rem",
    marginBottom: "1rem",
    borderBottom: "2px solid #e0e0e0",
    paddingBottom: "0.5rem"
  },
  text: {
    fontSize: "1.1rem",
    lineHeight: "1.6",
    marginBottom: "1rem"
  },
  techList: {
    paddingLeft: "1.5rem"
  },
  techItem: {
    marginBottom: "0.8rem",
    fontSize: "1.1rem",
    lineHeight: "1.5"
  },
  teamSection: {
    margin: "2rem 0"
  },
  benefitsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "1.5rem",
    marginTop: "1.5rem"
  },
  benefitCard: {
    background: "#f9f9f9",
    padding: "1.5rem",
    borderRadius: "8px",
    boxShadow: "0 2px 5px rgba(0,0,0,0.05)"
  },
  benefitTitle: {
    color: "#2c5a2e",
    fontSize: "1.3rem",
    marginBottom: "0.8rem"
  },
  contactCard: {
    background: "#f5f7f0",
    padding: "2rem",
    borderRadius: "8px",
    textAlign: "center",
    marginTop: "2rem"
  },
  contactInfo: {
    fontSize: "1.1rem",
    margin: "0.8rem 0"
  },
  link: {
    color: "#2c5a2e",
    textDecoration: "none",
    ":hover": {
      textDecoration: "underline"
    }
  }
};

export default AboutUs;