import React, { useState } from "react";
import { resetPassword } from "../firebase";
import { Link } from "react-router-dom";

function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await resetPassword(email);
      alert("Password reset email sent!");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h2 style={styles.heading}>Reset Password</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <label style={styles.label}>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={styles.input}
          />
          <button type="submit" style={styles.button}>Send Reset Link</button>
        </form>
        <p style={styles.text}>
          Remember your password? <Link to="/login" style={styles.link}>Login</Link>
        </p>
      </div>
    </div>
  );
}

const styles = {
  page: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: "#f5f5f5",
    padding: "1rem",
  },
  container: {
    background: "#fff",
    padding: "2rem",
    borderRadius: "10px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
    maxWidth: "400px",
    width: "100%",
  },
  heading: {
    marginBottom: "1.5rem",
    textAlign: "center",
    fontSize: "1.8rem",
    color: "#2c5a2e",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  label: {
    fontWeight: "bold",
    color: "#333",
  },
  input: {
    background: "white",
    color: "#333",
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "1rem",
    outline: "none",
  },
  button: {
    backgroundColor: "#2c5a2e",
    color: "#fff",
    padding: "10px",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
    fontSize: "1rem",
    transition: "background 0.3s ease",
  },
  text: {
    marginTop: "1rem",
    textAlign: "center",
    color: "#555",
  },
  link: {
    color: "#2c5a2e",
    textDecoration: "none",
    fontWeight: "bold",
  }
};

export default ForgotPassword;
