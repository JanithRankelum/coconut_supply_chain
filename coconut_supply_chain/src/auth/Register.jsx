import React, { useState } from "react";
import { 
  signInWithGoogle, 
  registerWithEmail 
} from "../firebase";
import { Link } from "react-router-dom";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [businessName, setBusinessName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerWithEmail(email, password, businessName);
      alert("Registration successful!");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div style={styles.container}>
      <h2>Register Your Business</h2>
      <form onSubmit={handleSubmit}>
        <label>Business Name:</label>
        <input
          type="text"
          value={businessName}
          onChange={(e) => setBusinessName(e.target.value)}
          required
        />

        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Register</button>
      </form>

      <button onClick={signInWithGoogle} style={styles.googleBtn}>
        Sign Up with Google
      </button>

      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}

const styles = {
  container: { padding: "20px", maxWidth: "400px", margin: "0" },
  googleBtn: { marginTop: "10px", padding: "10px", width: "100%" },
};

export default Register;