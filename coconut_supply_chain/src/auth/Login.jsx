import React, { useState } from "react";
import { signInWithGoogle, loginWithEmail } from "../firebase";
import { Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await loginWithEmail(email, password);
      alert("Login successful!");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h2 style={styles.heading}>Login</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <label style={styles.label}>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={styles.input}
          />

          <label style={styles.label}>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={styles.input}
          />

          <button type="submit" style={styles.button}>Login</button>
        </form>

        <button onClick={signInWithGoogle} style={styles.googleBtn}>
          Login with Google
        </button>

        <p style={styles.text}>
          Don’t have an account? <Link to="/register" style={styles.link}>Register</Link>
        </p>
        <p style={styles.text}>
          <Link to="/forgot-password" style={styles.link}>Forgot Password?</Link>
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
  googleBtn: {
    background: "white",
    color: "#2c5a2e",
    marginTop: "1rem",
    padding: "10px",
    width: "100%",
    backgroundColor: "#fff",
    border: "1px solid #ccc",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "1rem",
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

export default Login;
